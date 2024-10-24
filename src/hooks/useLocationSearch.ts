import { LOCATION_API_BASE_URL } from '@/api/urls';
import { ILocation } from '@/types/location';
import { getUniqueData } from '@/utils/getUniqueLocations';
import { sendGetRequest } from '@/utils/sendGetRequest';
import { useEffect, useState } from 'react';

// Custom hook for fetching location suggestions
export function useLocationSearch(
  query: string,
  isFocused: boolean,
  initLocation: ILocation[] = []
) {
  const [locations, setLocations] = useState<ILocation[]>(initLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    // Reset location suggestions if the query is less than 3 characters or the input isn't focused
    if (query.length < 3 || !isFocused) {
      setLocations(initLocation);
      return;
    }

    setIsLoading(true);
    const fetchLocations = async () => {
      try {
        const response = await sendGetRequest<ILocation[]>(
          LOCATION_API_BASE_URL(query)
        );

        // Use the utility function to remove duplicates
        const uniqueLocations = getUniqueData(response, 'place_id');

        setLocations(uniqueLocations);
        setError(null);
      } catch (err) {
        console.error('🚀 ~ fetchLocations ~ err:', err);
        setError('Failed to fetch locations.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [query]);

  useEffect(() => {
    if (isFocused) {
      setLocations(initLocation);
    }
  }, [isFocused]);

  return { locations, isLoading, error };
}
