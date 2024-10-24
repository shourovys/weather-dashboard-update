import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ContentCard,
} from '@/components/common/CardElements';
import {
  Carousel,
  CarouselContent,
} from '@/components/common/carouselElements';
import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeather } from '@/hooks/useWeather';
import { kelvinToCelsius } from '@/lib/utils';
import {
  DropletsIcon,
  EyeIcon,
  GaugeIcon,
  ThermometerIcon,
} from '@/utils/icons';

function WeatherDetails() {
  const { weatherData, weatherLoading } = useWeather();

  if (!weatherData || !weatherData.main || weatherLoading) {
    return (
      <div className='w-full h-60 md:h-64 flex items-center justify-center blur-bg'>
        <LoadingSvg className='w-10 h-10' />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel>
          <CarouselContent className='grid grid-cols-2 ml-0 gap-4 md:gap-6'>
            <ContentCard
              icon={ThermometerIcon}
              title='Feels Like'
              value={`${kelvinToCelsius(weatherData?.main.feels_like || 0)}°`}
            />
            <ContentCard
              icon={DropletsIcon}
              title='Humidity'
              value={`${weatherData?.main.humidity || 0}%`}
            />
            <ContentCard
              icon={EyeIcon}
              title='Visibility'
              value={`${Math.round(weatherData.visibility / 1000)} km`}
            />
            <ContentCard
              icon={GaugeIcon}
              title='Pressure'
              value={`${weatherData?.main?.pressure} hPa`}
            />
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default WeatherDetails;
