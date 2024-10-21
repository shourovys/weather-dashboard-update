import {
  CityIcon,
  MapIcon,
  ProfileIcon,
  SettingsIcon,
  WeatherIcon,
} from '@/utils/icons';

import {
  SidebarContainer,
  SidebarLogo,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '../common/SidebarElements';

const items = [
  {
    title: 'Weather',
    url: '/',
    icon: WeatherIcon,
  },
  {
    title: 'City',
    url: '/saved-cities',
    icon: CityIcon,
  },
  {
    title: 'Map',
    url: '/map',
    icon: MapIcon,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
];

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarLogo className='mb-14 hidden md:block' />
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuLink to={item.url}>
              <item.icon className='h-6 w-6 md:h-8 md:w-8' />
              <span>{item.title}</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className=' md:hidden'>
          <SidebarMenuLink to={'/profile'}>
            <ProfileIcon className='h-6 w-6 md:h-8 md:w-8' />
            <span>Profile</span>
          </SidebarMenuLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
}
