import { GET_GITHUB_USER_INFO } from '@/api/urls';
import AuthButton from '@/components/layout/auth/AuthButton';
import { GITHUB_CLIENT_ID } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { IAuthResponse } from '@/types/auth';
import { GitHubIcon } from '@/utils/icons';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import React, { useEffect } from 'react';

const GitHubLoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleGitHubLogin = () => {
    const clientId = GITHUB_CLIENT_ID;
    const callbackUrl = `${window.location}`;
    const targetUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=read:user,user:email`;

    window.location.href = targetUrl; // Redirect to GitHub's OAuth page
  };

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

  return (
    <AuthButton
      label='Continue with Github'
      onClick={handleGitHubLogin}
      icon={<GitHubIcon className='w-5 h-5 text-textPrimary' />}
    />
  );
};

export default GitHubLoginButton;
// <button
//   type='button'
//   className='py-2.5 px-3 max-w-md flex items-center justify-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-sm shadow-md rounded-sm relative'
//   onClick={handleGitHubLogin}
// >
//   <GitHubIcon className='w-5 h-5 absolute left-3' />
//   <span className='ml-6'>Sign in with GitHub</span>
// </button>
