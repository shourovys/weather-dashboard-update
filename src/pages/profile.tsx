import { Button } from '@/components/atomic/Button';
import { Card } from '@/components/common/CardElements';
import useAuth from '@/hooks/useAuth';
import React from 'react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Loading...</p>; // Handle the case where user data is not available yet
  }

  return (
    <Card className='profile-container max-w-md mx-auto mt-10 md:mt-20 p-4'>
      <div className='profile-header text-center mb-4 text-textPrimary '>
        <img
          src={user.picture || '/default-avatar.png'} // Fallback in case user.picture is undefined
          alt={`${user.name}'s avatar`}
          className='w-24 h-24 rounded-full mx-auto mb-4'
        />
        <h2 className='text-2xl font-semibold'>{user.name}</h2>
        <p className=''>{user.email}</p>
      </div>

      <div className='profile-actions text-center'>
        <Button
          onClick={logout}
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
        >
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default Profile;
