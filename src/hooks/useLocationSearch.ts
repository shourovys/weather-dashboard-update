import { fetcher } from '@/api/swrConfig';
import { LOCATION_API_BASE_URL } from '@/api/urls';
import { ILocation } from '@/types/location';
import { getUniqueData } from '@/utils/getUniqueLocations';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

// Custom hook for fetching location suggestions
export function useLocationSearch(
  query: string,
  isFocused: boolean,
  initLocation: ILocation[] = []
) {
  const [locations, setLocations] = useState<ILocation[]>(initLocation);

  const {
    trigger: fetchLocationsTrigger,
    isMutating: isLoading,
    error,
  } = useSWRMutation<ILocation[]>(
    query?.length >= 3 ? LOCATION_API_BASE_URL(query) : null,
    fetcher,
    {
      onSuccess: (data) => {
        const uniqueLocations = getUniqueData(data, 'place_id');
        setLocations(uniqueLocations);
      },
    }
  );

  useEffect(() => {
    // Reset location suggestions if the query is less than 3 characters or the input isn't focused
    if (query.length < 3 || !isFocused) {
      setLocations(initLocation);
      return;
    }

    fetchLocationsTrigger();
  }, [query]);

  useEffect(() => {
    if (isFocused) {
      setLocations(initLocation);
    }
  }, [isFocused]);

  return { locations, isLoading, error };
}
