import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import useAuth from '@/hooks/useAuth';
import { AUTH_STATUS } from '@/types/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuthenticated, openAuthDialog, status } = useAuth();

  // If the status is pending, wait for the authentication process to complete
  if (status === AUTH_STATUS.PENDING) {
    <div className='flex items-center justify-center w-full h-full'>
      <LoadingSvg className='w-10 h-10' />
    </div>;
  } else if (!isAuthenticated) {
    // If the user is not authenticated, open Auth Dialog to login
    openAuthDialog(true);
    return <Navigate to='/' />;
  }

  // If the user is authenticated, render the component
  if (isAuthenticated) {
    return <Component />;
  }
};

export default PrivateRoute;
