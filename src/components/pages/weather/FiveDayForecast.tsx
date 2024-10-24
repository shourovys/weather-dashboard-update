import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/CardElements';
import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeather } from '@/hooks/useWeather';
import { cn, kelvinToCelsius, unixToDay } from '@/lib/utils';
import { IForecastListItem } from '@/types/weather';

interface IProps {
  className?: string;
}
function FiveDayForecast({ className }: IProps) {
  const { forecastLoading, forecastData } = useWeather();

  if (!forecastData || forecastLoading) {
    return (
      <Card className='w-full h-full min-h-72 flex items-center justify-center blur-bg'>
        <LoadingSvg className='w-10 h-10' />
      </Card>
    );
  }

  const processData = (dailyData: IForecastListItem[]) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
      icon: dailyData[0].weather[0].icon,
      description: dailyData[0].weather[0].description,
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = forecastData?.list.slice(i, i + 5) || [];
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className=''>
        {dailyForecasts.map((day, i) => (
          <div
            key={i}
            className={cn(
              'pb-4 md:pb-6 mb-4 md:mb-6 border-b border-b-textSecondary flex items-center justify-between',
              className
            )}
          >
            <p className='text-xl min-w-[3.5rem]'>{day.day}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@4x.png`}
              alt={day.description}
              className='w-20 h-20 object-cover'
            />
            <div className=''>
              <p className='font-medium'>
                {day.maxTemp}° / {day.minTemp}°
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default FiveDayForecast;
