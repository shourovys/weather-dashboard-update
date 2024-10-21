import React, { useEffect, useState } from 'react';

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('🚀 ~ isLoggedIn:', isLoggedIn);

  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId =
      '853131068941-5hm5dsochh0qhef71k7dh62ifdbm33er.apps.googleusercontent.com';
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      console.log('🚀 ~ useEffect ~ accessToken:', accessToken);
      // Cookies.set('access_token', accessToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Log in with Google</h1>
        <div className='btn-container'>
          <button className='btn btn-primary' onClick={handleClick}>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
