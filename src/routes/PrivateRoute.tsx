import useAuth from '@/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { token } = useAuth();

  // Check if the user is authenticated or if permissions match
  const isAuthenticated = !!token;

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  // If the user is authenticated, render the component
  return <Component />;
};

export default PrivateRoute;
