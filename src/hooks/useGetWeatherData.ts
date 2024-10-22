import { CURRENT_WEATHER_URL } from '@/api/urls';
import { IWeatherData } from '@/types/weather';
import useSWR from 'swr';

export const useWeatherData = (lat: string, long: string) => {
  const { isLoading, data } = useSWR<IWeatherData>(
    CURRENT_WEATHER_URL(lat, long)
  );

  return { isLoading, data };
};
