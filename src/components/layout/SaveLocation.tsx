import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { useWeather } from '@/hooks/useWeather';
import { ISaveLocation } from '@/types/location';
import { addDocument } from '@/utils/firestoreService';
import { CommandButton } from '../common/CommandElement';

const SaveLocation = () => {
  const { user } = useAuth();
  const { location } = useWeather();

  const handleSave = async () => {
    try {
      if (user?.id && location) {
        await addDocument<ISaveLocation>(DB_COLLECTIONS.location, {
          userId: user?.id,
          ...location,
        });
      }
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <CommandButton
      className='flex-shrink-0'
      onClick={handleSave}
      disabled={!location}
    >
      Save City
    </CommandButton>
  );
};

export default SaveLocation;
