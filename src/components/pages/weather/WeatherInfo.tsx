import { IWeatherData } from '@/types/weather';

interface IWeatherInfoProps {
  weatherData: IWeatherData | null;
}

const WeatherInfo: React.FC<IWeatherInfoProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>; // Optional: Loading state
  }

  const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius
  const chanceOfRain =
    weatherData?.rain && weatherData?.rain['1h'] ? weatherData.rain['1h'] : 0; // Get rain data or set to 0 if not available
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`; // Build URL for the weather icon

  return (
    <div className='text-textPrimary rounded-xl p-4 md:p-8 flex justify-between drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]'>
      <div className='flex flex-col justify-between font-bold '>
        <div className='space-y-1 md:space-y-2'>
          <h2 className='text-5xl '>{weatherData.name}</h2>
          <p className='text-base md:text-lg font-semibold '>
            Next Hour Rain: {chanceOfRain} mm
          </p>
        </div>

        <p className='text-7xl'> {temperatureCelsius}°</p>
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
