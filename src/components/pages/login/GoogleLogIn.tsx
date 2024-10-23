import { GET_GOOGLE_USER_INFO } from '@/api/urls';
import { GOOGLE_CLIENT_ID } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { IAuthResponse } from '@/types/auth';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import React from 'react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    const idToken = response.credential;

    // Optional: Send the access token to the backend for validation and secure processing.
    const data = await sendAppGetRequest<IAuthResponse>(
      GET_GOOGLE_USER_INFO(idToken || '')
    );

    login(data.user, data.token);
  };

  const handleGoogleLoginError = () => {
    console.error('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default Login;
