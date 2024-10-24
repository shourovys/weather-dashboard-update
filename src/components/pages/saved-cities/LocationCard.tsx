import { Card, CardContent } from '@/components/common/CardElements';
import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeatherData } from '@/hooks/useGetWeatherData';
import { useWeather } from '@/hooks/useWeather';
import { cn, kelvinToCelsius } from '@/lib/utils';
import { ISaveLocation } from '@/types/location';
import React from 'react';

interface IProps {
  location: ISaveLocation;
}
const LocationCard: React.FC<IProps> = ({ location }) => {
  const { data, isLoading } = useWeatherData(location.lat, location.lon);
  const { location: currentySelected, setLocation } = useWeather();

  const handleSelectLocation = () => {
    setLocation(location);
  };

  if (isLoading || !data) {
    return (
      <Card className='w-full flex items-center justify-center blur-bg'>
        <CardContent className='p-6 min-h-36 flex items-center justify-center'>
          <LoadingSvg className='w-10 h-10' />
        </CardContent>
      </Card>
    );
  }
  const { weather, main } = data;
  return (
    <Card
      className={cn(
        'w-full flex items-center justify-center blur-bg border-4 border-transparent',
        {
          'border-blue-400': currentySelected?.place_id === location.place_id,
        }
      )}
      onClick={handleSelectLocation}
    >
      <CardContent className='p-6 w-full flex items-center gap-3 md:gap-5'>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@4x.png`}
          alt={weather[0]?.description}
          className='size-20 md:size-32 object-cover hidden sm:block'
        />
        <div className='flex justify-between w-full gap-3 md:gap-5'>
          <div className='space-y-1'>
            <p className='text-xl sm:text-2xl md:text-3xl '>
              {location.display_name}
            </p>
            <p className='text-lg md:text-xl'>{weather[0]?.description}</p>
          </div>
          <p className='font-bold text-3xl sm:text-4xl md:text-5xl'>
            {kelvinToCelsius(main.temp)}°
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
