import { IRouteProperty } from '@/types/common';
import { ProfileIcon } from '@/utils/icons';

const OTHER_ROUTES: IRouteProperty = {
  profile: {
    key: 'Profile',
    label: 'Profile',
    path: '/profile',
    exact: true,
    component: () => <h1> Login</h1>,
    icon: ProfileIcon,
    permissions: 'user',
  },
} as const;

export default OTHER_ROUTES;
