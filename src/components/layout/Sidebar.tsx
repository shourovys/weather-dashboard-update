import MENU_ROUTES from '@/routes/menu';
import ROUTES, { getRoutesArray } from '@/routes/routes';
import {
  SidebarContainer,
  SidebarLogo,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '../common/SidebarElements';

export function Sidebar() {
  const menuRoutes = getRoutesArray(MENU_ROUTES);

  const { label, path, icon: Icon } = ROUTES.profile;
  return (
    <SidebarContainer>
      <SidebarLogo className='mb-14 hidden md:block' />
      <SidebarMenu>
        {menuRoutes.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuLink to={item.path}>
              {item.icon && <item.icon className='h-6 w-6 md:h-8 md:w-8' />}
              <span>{item?.label}</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className=' md:hidden'>
          <SidebarMenuLink to={path}>
            {Icon && <Icon className='h-6 w-6 md:h-8 md:w-8' />}
            <span>{label}</span>
          </SidebarMenuLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
}
