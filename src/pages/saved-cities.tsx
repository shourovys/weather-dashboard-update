import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { ISaveLocation } from '@/types/location';
import { getDocumentsByField } from '@/utils/firestoreService';
import { useEffect } from 'react';

const SaveCities = () => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const data = await getDocumentsByField<ISaveLocation>(
            DB_COLLECTIONS.location,
            'userId',
            user.id
          );
          console.log('🚀 ~ fetchUserData ~ data:', data);
        } catch (error) {
          console.error('Error fetching location data: ', error);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <div>
      <h1>Save Cities</h1>
    </div>
  );
};

export default SaveCities;
