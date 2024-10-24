/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_GOOGLE_USER_INFO } from '@/api/urls';
import AuthButton from '@/components/layout/auth/AuthButton';
import { GOOGLE_CLIENT_ID } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { IAuthResponse } from '@/types/auth';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton: React.FC = () => {
  const { login } = useAuth();
  const googleClientRef = useRef<any>(null);

  const handleGoogleLoginSuccess = async (accessToken: string) => {
    // Send the access token to the backend for validation and secure processing.
    const data = await sendAppGetRequest<IAuthResponse>(
      GET_GOOGLE_USER_INFO(accessToken)
    );

    // Call login function with user data and token
    login(data.user, data.token);
  };

  const handleGoogleLoginError = () => {
    console.error('Google login failed');
  };

  useEffect(() => {
    // Initialize Google OAuth client
    googleClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'email profile openid',
      callback: (response: any) => {
        if (response.error) {
          handleGoogleLoginError();
        } else {
          handleGoogleLoginSuccess(response.access_token);
        }
      },
    });
  }, []);

  const handleGoogleLoginClick = () => {
    // Trigger the Google OAuth login process
    googleClientRef.current.requestAccessToken();
  };

  return (
    <AuthButton
      label='Continue with Google'
      icon={
        <img
          src='https://www.svgrepo.com/show/475656/google-color.svg'
          className='w-5'
          alt='google logo'
        />
      }
      onClick={handleGoogleLoginClick} // Attach the login click handler
    />
  );
};

export default GoogleLoginButton;
