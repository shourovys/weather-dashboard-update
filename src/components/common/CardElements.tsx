import * as React from 'react';

import { cn } from '@/lib/utils';
import { IconType } from '@/utils/icons';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-xl blur-bg text-textPrimary shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-sm md:text-base font-semibold leading-none tracking-tight uppercase text-textSecondary',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

interface IContentCardProps {
  title: string;
  value: number | string;
  className?: string;
  icon: IconType;
}

const ContentCard: React.FC<IContentCardProps> = ({
  title,
  className,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className={cn(
        'flex gap-2 md:gap-3 text-lg font-semibold text-textSecondary',
        className
      )}
    >
      <Icon className='h-8 w-8 md:h-8 md:w-8' />
      <div>
        <h2>{title}</h2>
        <p className='pt-2 text-3xl md:text-4xl font-bold md:font-extrabold'>
          {value}
        </p>
      </div>
    </div>
  );
};

export { Card, CardContent, CardHeader, CardTitle, ContentCard };
