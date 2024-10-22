import { IconType } from '@/utils/icons';

export interface IRouteBase {
  key: string; // key for unique route
  path: string;
  exact?: boolean;
  component: React.ComponentType;
  permissions: '*' | 'user';
}

export interface IRouteWithLabel extends IRouteBase {
  label: string; // label route will show in menu
  icon: IconType;
}

export interface IRouteWithOutLabel extends IRouteBase {
  label?: never;
  icon?: never;
}

export type IRoute = IRouteWithLabel | IRouteWithOutLabel;

export interface IRouteProperty {
  [key: string]: IRoute;
}
