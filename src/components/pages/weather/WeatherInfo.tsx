import LoadingSvg from '@/components/loading/atomic/LoadingSvg';
import { useWeather } from '@/hooks/useWeather';
import { kelvinToCelsius } from '@/lib/utils';

const WeatherInfo: React.FC = () => {
  const { weatherData, weatherLoading } = useWeather();

  if (weatherLoading || !weatherData) {
    return (
      <div className='w-full h-56 md:h-60 flex items-center justify-center'>
        <LoadingSvg className='w-10 h-10' />
      </div>
    );
  }
  const { main, weather } = weatherData;
  const { description } = weather[0];
  // const { main: weatherMain, description } = weather[0];

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  return (
    <div className='text-textPrimary rounded-xl p-4 md:p-8 md:py-4 flex justify-between drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]'>
      <div className='flex flex-col justify-between font-bold '>
        <div className='space-y-1 md:space-y-2'>
          <h2 className='text-5xl '>{description}</h2>
          <p className='flex items-center gap-2 text-base md:text-lg font-semibold '>
            <span>Low: {minTemp}°</span>
            <span>High: {maxTemp}°</span>
          </p>
        </div>

        <p className='text-7xl'> {temp}°</p>
      </div>
      <img
        src={weatherIcon}
        alt={weatherData.weather[0].description}
        className='w-52 h-52 object-cover'
      />
    </div>
  );
};

export default WeatherInfo;
