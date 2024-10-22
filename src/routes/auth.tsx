import { IRouteProperty } from '@/types/common';

const AUTH_ROUTES: IRouteProperty = {
  login: {
    key: 'Login',
    path: '/',
    exact: true,
    component: () => <h1> Login</h1>,
    permissions: '*',
  },
} as const;

export default AUTH_ROUTES;
