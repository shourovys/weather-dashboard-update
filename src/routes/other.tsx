import Profile from '@/pages/profile';
import { IRouteProperty } from '@/types/common';
import { ProfileIcon } from '@/utils/icons';

const OTHER_ROUTES: IRouteProperty = {
  profile: {
    key: 'Profile',
    label: 'Profile',
    path: '/profile',
    exact: true,
    component: Profile,
    icon: ProfileIcon,
    permissions: 'user',
  },
} as const;

export default OTHER_ROUTES;
