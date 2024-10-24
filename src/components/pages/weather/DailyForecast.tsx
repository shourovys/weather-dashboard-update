import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/CardElements';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/common/carouselElements';
import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeather } from '@/hooks/useWeather';
import { kelvinToCelsius } from '@/lib/utils';
import { IForecastListItem } from '@/types/weather';
import moment from 'moment';

function DailyForecast() {
  const { weatherData, forecastLoading, forecastData } = useWeather();

  if (!weatherData || !weatherData || !forecastData || forecastLoading) {
    return (
      <Card className='w-full h-60 md:h-64 flex items-center justify-center blur-bg'>
        <LoadingSvg className='w-10 h-10' />
      </Card>
    );
  }

  const { weather } = weatherData;
  const { list } = forecastData;

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  //filter the list for today's forecast
  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  if (!weather || todaysForecast.length < 1) {
    return (
      <Card className='w-full h-60 md:h-64 flex items-center justify-center blur-bg'>
        <h1 className='text-textSecondary text-3xl'>No Data Available!</h1>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>today's forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel>
          <CarouselContent className='divide-x divide-textSecondary'>
            {todaysForecast.map((forecast: IForecastListItem) => (
              <CarouselItem
                key={forecast.dt_txt}
                className='flex flex-col items-center text-textPrimary gap-4 basis-[8.5rem] cursor-grab'
              >
                <p className='text-textSecondary font-semibold text-lg'>
                  {moment(forecast.dt_txt).format('hh:mm A')}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                  alt={forecast.weather[0].description}
                  className='h-16 w-16 object-cover'
                />
                <p className='text-xl md:text-2xl font-semibold md:font-extrabold'>
                  {kelvinToCelsius(forecast.main.temp)}°
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}

export default DailyForecast;
