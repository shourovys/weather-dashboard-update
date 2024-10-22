import { WeatherContext } from '@/context/weatherContext';
import { useContext } from 'react';

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
