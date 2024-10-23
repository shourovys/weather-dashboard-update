import { IRoute, IRouteProperty } from '@/types/common';
import MENU_ROUTES from './menu';
import OTHER_ROUTES from './other';

const ROUTES: IRouteProperty = {
  ...MENU_ROUTES,
  ...OTHER_ROUTES,
};

export default ROUTES;

export const getRoutesArray = (routes: IRouteProperty) => {
  return Object.entries(routes).map(([, value]: [string, IRoute]) => value);
};

export const ReactRoutes: IRoute[] = getRoutesArray(ROUTES);
