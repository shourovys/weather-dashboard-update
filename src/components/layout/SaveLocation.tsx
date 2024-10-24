import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToasts';
import { useWeather } from '@/hooks/useWeather';
import { ISaveLocation } from '@/types/location';
import { addDocument } from '@/utils/firestoreService';
import { useState } from 'react';
import { CommandButton } from '../common/CommandElements';

const SaveLocation = () => {
  const { user, isAuthenticated, openAuthDialog } = useAuth();
  const { location, savedLocationsData } = useWeather();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      openAuthDialog(true);
    }

    const isSelectedLocationSaved = savedLocationsData?.some(
      (locationSV: ISaveLocation) => locationSV.place_id === location?.place_id
    );
    if (isSelectedLocationSaved) {
      toast({
        title: 'Location already saved',
        description: 'You have already saved this location.',
        duration: 3000,
      });

      return;
    }

    try {
      if (user?.id && location) {
        setIsLoading(true);
        await addDocument<Omit<ISaveLocation, 'id'>>(DB_COLLECTIONS.location, {
          userId: user?.id,
          ...location,
        });
        toast({
          title: 'Location saved',
          description: 'Your location has been saved.',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding user: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommandButton
      className='flex-shrink-0'
      onClick={handleSave}
      disabled={!location || isLoading}
      isLoading={isLoading}
    >
      Save City
    </CommandButton>
  );
};

export default SaveLocation;
