import { IRoute, IRouteProperty } from '@/types/common';
import AUTH_ROUTES from './auth';
import MENU_ROUTES from './menu';
import OTHER_ROUTES from './other';

const ROUTES: IRouteProperty = {
  ...MENU_ROUTES,
  ...OTHER_ROUTES,
  ...AUTH_ROUTES,
};

export default ROUTES;

export const getRoutesArray = (routes: IRouteProperty) => {
  return Object.entries(routes).map(([, value]: [string, IRoute]) => value);
};

export const ReactRoutes: IRoute[] = getRoutesArray(ROUTES);
