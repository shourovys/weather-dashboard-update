import { IRouteProperty } from '@/types/common';
import { CityIcon, MapIcon, SettingsIcon, WeatherIcon } from '@/utils/icons';

// Define routes with TypeScript
const MENU_ROUTES: IRouteProperty = {
  weather: {
    key: 'Weather',
    label: 'Weather',
    path: '/',
    exact: true,
    component: () => <h1> Weather</h1>,
    icon: WeatherIcon,
    permissions: '*',
  },
  city: {
    key: 'City',
    label: 'City',
    path: '/saved-cities',
    exact: true,
    component: () => <h1> City</h1>,
    icon: CityIcon,
    permissions: 'user',
  },
  map: {
    key: 'Map',
    label: 'Map',
    path: '/map',
    exact: true,
    component: () => <h1> Map</h1>,
    icon: MapIcon,
    permissions: 'user',
  },
  settings: {
    key: 'Settings',
    label: 'Settings',
    path: '/settings',
    exact: true,
    component: () => <h1> Settings</h1>,
    icon: SettingsIcon,
    permissions: '*',
  },
} as const;

export default MENU_ROUTES;
