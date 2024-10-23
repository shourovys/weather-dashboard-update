import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { useWeather } from '@/hooks/useWeather';
import { addDocument } from '@/utils/firestoreService';

const SaveLocation = () => {
  const { user } = useAuth();
  const { location } = useWeather();

  const handleSave = async () => {
    try {
      await addDocument(DB_COLLECTIONS.location, {
        userId: String(user?.id),
        ...location,
      });
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
