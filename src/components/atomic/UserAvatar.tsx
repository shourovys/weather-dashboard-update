import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/AvatarElements';
import useAuth from '@/hooks/useAuth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../common/PopoverElements';
import { Button } from './Button';

const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const { isAuthenticated, user, logout, openAuthDialog } = useAuth();

  if (!isAuthenticated) {
    return (
      <Popover>
        <PopoverTrigger>
          <Avatar className={className}>
            <AvatarImage src='/images/no_user.png' alt={user?.name} />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          align='end'
          className='flex items-center justify-center'
        >
          <Button
            variant='secondary'
            onClick={() => openAuthDialog(true)}
            className='mt-2'
          >
            Login
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={className}>
          <AvatarImage src={user?.picture} alt={user?.name} />
          <AvatarFallback>
            {user?.name.split(' ')[0][0]}
            {user?.name.split(' ')[1][0]}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align='end' className=''>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <Button variant='secondary' onClick={logout} className='mt-2'>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
