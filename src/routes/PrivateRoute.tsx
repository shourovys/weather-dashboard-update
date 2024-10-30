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
  const { openAuthDialog, status } = useAuth();

  // Handling authentication states
  const renderContent = () => {
    switch (status) {
      case AUTH_STATUS.PENDING:
        return (
          <div className='flex items-center justify-center w-full h-full'>
            <LoadingSvg className='w-10 h-10' />
          </div>
        );

      case AUTH_STATUS.SUCCEEDED:
        return <Component />;

      default:
        openAuthDialog(true);
        return <Navigate to='/' replace />;
    }
  };

  return <>{renderContent()}</>;
};

export default PrivateRoute;
