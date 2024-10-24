import AuthButton from '@/components/layout/auth/AuthButton';
import { GITHUB_CLIENT_ID } from '@/config/config';
import { GitHubIcon } from '@/utils/icons';
import React from 'react';

const GitHubLoginButton: React.FC = () => {
  const handleGitHubLogin = () => {
    const clientId = GITHUB_CLIENT_ID;
    const callbackUrl = `${window.location}`;
    const targetUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=read:user,user:email`;

    window.location.href = targetUrl; // Redirect to GitHub's OAuth page
  };

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
