import DailyForecast from '@/components/pages/weather/DailyForecast';
import FiveDayForecast from '@/components/pages/weather/FiveDayForecast';
import WeatherDetails from '@/components/pages/weather/WeatherDetails';
import WeatherInfo from '@/components/pages/weather/WeatherInfo';

const Weather = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-3 md:gap-y-5 lg:gap-x-5'>
      <div className='col-span-2 space-y-3 md:space-y-5'>
        <WeatherInfo />
        <DailyForecast />
        <WeatherDetails />
      </div>
      <div className='col-span-1'>
        <FiveDayForecast />
      </div>
    </div>
  );
};

export default Weather;
