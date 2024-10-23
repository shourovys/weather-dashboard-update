import Login from '@/pages/Login';
import { IRouteProperty } from '@/types/common';

const AUTH_ROUTES: IRouteProperty = {
  login: {
    key: 'Login',
    path: '/login',
    exact: true,
    component: Login,
    permissions: '*',
  },
} as const;

export default AUTH_ROUTES;
