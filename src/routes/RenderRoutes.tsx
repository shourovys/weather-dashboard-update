import { IRoute } from '@/types/common';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const RenderRoutes: React.FC<{ routes: IRoute[] }> = ({ routes }) => {
  return (
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
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
