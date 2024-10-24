import SavedLocations from '@/components/pages/saved-cities/SavedLocations';
import DailyForecast from '@/components/pages/weather/DailyForecast';
import FiveDayForecast from '@/components/pages/weather/FiveDayForecast';
import WeatherInfo from '@/components/pages/weather/WeatherInfo';
import { useWeather } from '@/hooks/useWeather';
import { useEffect } from 'react';

const SaveCities = () => {
  const { savedLocationsData, setLocation } = useWeather();

  useEffect(() => {
    if (savedLocationsData?.[0]) {
      setLocation(savedLocationsData?.[0]);
    }
  }, []);

  return (
    <div className='grid grid-cols-3 gap-3 md:gap-5'>
      <div className='col-span-2 space-y-3 md:space-y-5'>
        <SavedLocations />
      </div>
      <div className='col-span-1 space-y-3 md:space-y-5'>
        <div className='rounded-xl blur-bg'>
          <WeatherInfo />
        </div>
        <DailyForecast />
        <FiveDayForecast className='pb-1 mb-1 md:pb-1 md:mb-1' />
      </div>
    </div>
  );
};

export default SaveCities;
