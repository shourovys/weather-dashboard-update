import { LOCATIONIQ_API_KEY, WEATHER_API_KEY } from '@/config/config.ts';

export const LOCATION_API_BASE_URL = (query: string) =>
  `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${query}&limit=5&format=json`;

export const CURRENT_WEATHER_URL = (lat: string, long: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`;

export const FIVE_DAY_FORECAST_URL = (lat: string, long: string) =>
  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`;

export const GET_GOOGLE_USER_INFO = (accessToken: string) =>
  `/google/userData?accessToken=${accessToken}`;

export const GET_GITHUB_USER_INFO = (code: string) =>
  `/github/userData?code=${code}`;

export const AUTH = {
  ME: '/user/me',
  REFRESH_TOKEN: '/user/refreshToken',
};
