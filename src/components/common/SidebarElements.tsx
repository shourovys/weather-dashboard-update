import { cn } from '@/lib/utils';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex h-min md:h-full w-full md:w-24 flex-col md:rounded-xl p-2 blur-bg',
        className
      )}
      data-sidebar='sidebar'
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
SidebarContainer.displayName = 'SidebarContainer';

const SidebarLogo = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<'img'>
>(({ className, ...props }, ref) => {
  return (
    <Link to='/'>
      <img
        ref={ref}
        data-sidebar='sidebar-logo'
        className={cn(
          'flex w-full h-auto shrink-0 items-center rounded-xl px-2',
          className
        )}
        src='/images/logo.png'
        alt=''
        {...props}
      />
    </Link>
  );
});
SidebarLogo.displayName = 'SidebarLogo';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar='menu'
    className={cn(
      'flex w-full min-w-0 flex-row md:flex-col items-center sm:gap-2 md:gap-6',
      className
    )}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar='menu-item'
    className={cn('w-full', className)}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
}> = ({ to, children, className }) => {
  const location = useLocation();

  return (
    <Link
      data-sidebar='menu-button'
      className={cn(
        'flex flex-col items-center gap-0.5 text-textSecondary md:hover:bg-textHover rounded-xl md:p-2 text-xs md:text-sm font-bold transform transition-all duration-200 ease-in-out w-full',
        location.pathname === to && 'text-textPrimary font-bold',
        className
      )}
      to={to}
    >
      {children}
    </Link>
  );
};

export {
  SidebarContainer,
  SidebarLogo,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
};
