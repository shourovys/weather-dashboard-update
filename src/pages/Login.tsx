import SocialLogin from '@/components/pages/login/SocialLogin';
import useAuth from '@/hooks/useAuth';
import ROUTES from '@/routes/routes';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      <Navigate to={ROUTES.weather.path} />;
    }
  }, [token]);

  return (
    <section>
      <div>
        <SocialLogin />
      </div>
    </section>
  );
};

export default LoginPage;
