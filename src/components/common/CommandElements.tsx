import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/utils/icons';
import LoadingSvg from '../loading/atomic/LoadingSvg';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex w-full h-min flex-col overflow-hidden blur-bg text-textPrimary rounded-xl shadow-md',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className='flex items-center px-3 w-full' cmdk-input-wrapper=''>
    <SearchIcon className='mr-2 h-6 w-6 shrink-0 text-textPrimary' />
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-xl bg-transparent py-3 text-sm outline-none font-semibold placeholder:text-textSecondary disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));

const CommandButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
  }
>(({ className, isLoading, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={props.type || 'button'} // Default to "button" if no type is provided
      className={cn(
        'flex items-center justify-center h-12 min-w-20 rounded-xl bg-transparent py-3 px-5 text-sm font-semibold hover:bg-textHover disabled:hover:bg-transparent outline-none disabled:cursor-default disabled:opacity-50',
        className
      )}
      children={isLoading ? <LoadingSvg /> : children}
      {...props} // Spreading the rest of the props to allow flexibility
    />
  );
});

CommandButton.displayName = 'CommandButton';

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[300px] border-t overflow-y-auto overflow-x-hidden',
      className
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className='py-6 text-center text-sm'
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-textSecondary',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm text-sm outline-none hover:bg-accent hover:text-accent-foreground text-textPrimary',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export {
  Command,
  CommandButton,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
};
