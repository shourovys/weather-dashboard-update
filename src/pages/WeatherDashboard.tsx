import React, { useState } from 'react';
import { WEATHER_API_KEY } from '../utils/config';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather API response interface
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null); // Reset error
    try {
      const data: WeatherData = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setError('Could not fetch weather data. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>Weather Dashboard</h1>
      <div className='flex items-center mb-4'>
        <input
          type='text'
          className='p-2 border rounded-lg mr-2'
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white p-2 rounded-lg'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {weatherData && (
        <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-2'>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
