import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import NotFoundPage from '@/pages/not-found';
import { IRoute } from '@/types/common';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const RenderRoutes: React.FC<{ routes: IRoute[] }> = ({ routes }) => {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center w-full h-full'>
          <LoadingSvg className='size-16' />
        </div>
      }
    >
      <Routes>
        {routes.map((route) => {
          if (route.permissions === '*') {
            return (
              <Route
                key={route.key}
                path={route.path}
                Component={route.component}
              />
            );
          } else {
            return (
              <Route
                key={route.key}
                path={route.path}
                element={<PrivateRoute component={route.component} />}
              />
            );
          }
        })}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
