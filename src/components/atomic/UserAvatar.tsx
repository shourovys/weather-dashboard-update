import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/AvatarElements';
import useAuth from '@/hooks/useAuth';
import ROUTES from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, openAuthDialog } = useAuth();

  if (!isAuthenticated) {
    return (
      <Avatar className={className} onClick={() => openAuthDialog(true)}>
        <AvatarImage src='/images/no_user.png' alt={user?.name} />
      </Avatar>
    );
  }

  const navigateToProfile = () => {
    navigate(ROUTES.profile.path);
  };

  return (
    <Avatar className={className} onClick={navigateToProfile}>
      <AvatarImage src={user?.picture} alt={user?.name} />
      <AvatarFallback>
        {user?.name.split(' ')[0][0]}
        {user?.name.split(' ')[1][0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
