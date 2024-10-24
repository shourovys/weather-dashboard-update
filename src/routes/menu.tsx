import Map from '@/pages/map';
import SaveCities from '@/pages/saved-cities';
import Settings from '@/pages/settings';
import Weather from '@/pages/Weather';
import { IRouteProperty } from '@/types/common';
import { CityIcon, MapIcon, SettingsIcon, WeatherIcon } from '@/utils/icons';

// const Weather = lazy(() => import('@/pages/Weather'));
// const SaveCities = lazy(() => import('@/pages/saved-cities'));
// const Map = lazy(() => import('@/pages/map'));
// const Settings = lazy(() => import('@/pages/settings'));

// Define routes with TypeScript
const MENU_ROUTES: IRouteProperty = {
  weather: {
    key: 'Weather',
    label: 'Weather',
    path: '/',
    exact: true,
    component: Weather,
    icon: WeatherIcon,
    permissions: '*',
  },
  city: {
    key: 'City',
    label: 'City',
    path: '/saved-cities',
    exact: true,
    component: SaveCities,
    icon: CityIcon,
    permissions: 'user',
  },
  map: {
    key: 'Map',
    label: 'Map',
    path: '/map',
    exact: true,
    component: Map,
    icon: MapIcon,
    permissions: '*',
  },
  settings: {
    key: 'Settings',
    label: 'Settings',
    path: '/settings',
    exact: true,
    component: Settings,
    icon: SettingsIcon,
    permissions: '*',
  },
} as const;

export default MENU_ROUTES;
