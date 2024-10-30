import { GET_GITHUB_USER_INFO } from '@/api/urls';
import api from '@/config/apiConfig';
import useAuth from '@/hooks/useAuth';
import { IAuthResponse } from '@/types/auth';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const GitHubLoginSuccess = () => {
  const { mutate } = useSWRConfig();
  const { login } = useAuth();

  const handelGithubLoginSuccess = async (code: string) => {
    try {
      const data = await mutate<IAuthResponse>(
        GET_GITHUB_USER_INFO(code),
        async () => {
          // Fetch user data with `accessToken` in headers
          const res = await api.get(GET_GITHUB_USER_INFO(code));
          return res.data;
        },
        { revalidate: false }
      );

      // Call login function with user data and token if successful
      if (data) {
        login(data.user, data.token);
      }
    } catch (error) {
      console.error('Error fetching Github user info:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code'); // Get the authorization code from the callback URL

    if (code) {
      // Exchange the authorization code for an access token
      handelGithubLoginSuccess(code);
    }
  }, []);
  return null;
};

export default GitHubLoginSuccess;
