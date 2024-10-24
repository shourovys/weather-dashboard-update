import { GET_GITHUB_USER_INFO } from '@/api/urls';
import useAuth from '@/hooks/useAuth';
import { IAuthResponse } from '@/types/auth';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import { useEffect } from 'react';

const GitHubLoginSuccess = () => {
  const { login } = useAuth();
  const handelGithubLoginSuccess = async (code: string) => {
    try {
      const data = await sendAppGetRequest<IAuthResponse>(
        GET_GITHUB_USER_INFO(code)
      );

      login(data.user, data.token);
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
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
