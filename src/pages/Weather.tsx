import WeatherInfo from '@/components/pages/weather/WeatherInfo';
import { useWeather } from '@/hooks/useWeather';

const Weather = () => {
  const { weatherData } = useWeather();

  return (
    <div>
      <WeatherInfo weatherData={weatherData} />
    </div>
  );
};

export default Weather;
