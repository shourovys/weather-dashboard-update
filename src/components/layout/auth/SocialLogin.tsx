import React from 'react';
import GitHubLoginComponent from './GitHubLogin';
import GoogleLoginComponent from './GoogleLogIn';

const SocialLogin: React.FC = () => {
  return (
    <div>
      <h2>Login with Social Accounts</h2>
      <GoogleLoginComponent />
      <GitHubLoginComponent />
    </div>
  );
};

export default SocialLogin;
