import { CloudSunRain, Logs, Map, SlidersHorizontal, User } from 'lucide-react';

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
    icon: CloudSunRain,
  },
  {
    title: 'City',
    url: '/saved-cities',
    icon: Logs,
  },
  {
    title: 'Map',
    url: '/map',
    icon: Map,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SlidersHorizontal,
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
            <User className='h-6 w-6 md:h-8 md:w-8' />
            <span>Profile</span>
          </SidebarMenuLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
}
