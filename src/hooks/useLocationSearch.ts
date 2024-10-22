import { LOCATION_API_BASE_URL } from '@/api/urls';
import { sendGetRequest } from '@/utils/sendGetRequest';
import { useEffect, useState } from 'react';

interface ILocation {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

const initLocation: ILocation[] = [
  {
    display_name: 'Dhaka, Bangladesh',
    place_id: '324122088023',
    lat: '23.7644025',
    lon: '90.389015',
  },
  {
    display_name: 'Dhaka Division, Bangladesh',
    place_id: '323693304022',
    lat: '23.9456166',
    lon: '90.2526382',
  },
  {
    display_name: 'Dhaka, Bihar, 845418, India',
    place_id: '320379156252',
    lat: '26.6923775',
    lon: '85.19863621',
  },
  {
    display_name: 'Dhaka District, Dhaka Division, Bangladesh',
    place_id: '323458673339',
    lat: '23.78047185',
    lon: '90.35832872',
  },
  {
    display_name: 'Keraniganj Subdistrict, Dhaka Division, Bangladesh',
    place_id: '321726558922',
    lat: '23.7179868',
    lon: '90.35375362',
  },
];

// Custom hook for fetching location suggestions
export function useLocationSearch(query: string, isFocused: boolean) {
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

        // Remove duplicates based on 'place_id'
        const uniqueLocations = response.reduce(
          (acc: ILocation[], item: ILocation) => {
            if (!acc.some((i) => i.place_id === item.place_id)) {
              acc.push(item);
            }
            return acc;
          },
          []
        );

        setLocations(
          uniqueLocations.map((item: ILocation) => ({
            display_name: item?.display_name || '',
            place_id: item?.place_id || '',
            lat: item?.lat || '',
            lon: item?.lon || '',
          }))
        );
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

  return { locations, isLoading, error };
}
