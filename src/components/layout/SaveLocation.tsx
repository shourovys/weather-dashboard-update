import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { useWeather } from '@/hooks/useWeather';
import { ISaveLocation } from '@/types/location';
import { addDocument } from '@/utils/firestoreService';

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
    <div>
      <button onClick={handleSave} className='bg-black p-3 text-textPrimary'>
        Save
      </button>
    </div>
  );
};

export default SaveLocation;
