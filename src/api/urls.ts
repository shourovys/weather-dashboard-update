import { LOCATIONIQ_API_KEY, WEATHER_API_KEY } from '@/utils/config.ts';

export const LOCATION_API_BASE_URL = (query: string) =>
  `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${query}&limit=5&format=json`;

export const CURRENT_WEATHER_URL = (lat: string, long: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`;

export const FIVE_DAY_FORECAST_URL = (lat: string, long: string) =>
  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`;
