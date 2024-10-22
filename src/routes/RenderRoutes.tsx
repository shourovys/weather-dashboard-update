import { IRoute } from '@/types/common';
import { Route, Routes } from 'react-router-dom';

export const RenderRoutes: React.FC<{ routes: IRoute[] }> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.key}
            path={route.path}
            Component={route.component}
          />
        );
      })}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
