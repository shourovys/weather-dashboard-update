import { IForecastData, ILocation, IWeatherData } from '@/types/weather';

interface IWeatherState {
  location: ILocation | null;
  weatherData: IWeatherData | null;
  forecastData: IForecastData | null;
  weatherLoading: boolean;
  forecastLoading: boolean;
  error: string | null;
}

type WeatherAction =
  | { type: 'SET_LOCATION'; payload: ILocation }
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_WEATHER_REQUEST' }
  | { type: 'FETCH_WEATHER_SUCCESS'; payload: IWeatherData }
  | { type: 'FETCH_WEATHER_FAILURE'; payload: string }
  | { type: 'FETCH_FORECAST_REQUEST' }
  | { type: 'FETCH_FORECAST_SUCCESS'; payload: IForecastData }
  | { type: 'FETCH_FORECAST_FAILURE'; payload: string };

export const initialWeatherState: IWeatherState = {
  location: null,
  weatherData: null,
  forecastData: null,
  weatherLoading: false,
  forecastLoading: false,
  error: null,
};

const weatherReducer = (
  state: IWeatherState,
  action: WeatherAction
): IWeatherState => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload, error: null };

    case 'FETCH_REQUEST':
      return {
        ...state,
        weatherLoading: true,
        forecastLoading: true,
        error: null,
      };

    case 'FETCH_WEATHER_REQUEST':
      return { ...state, weatherLoading: true, error: null };

    case 'FETCH_WEATHER_SUCCESS':
      return { ...state, weatherLoading: false, weatherData: action.payload };

    case 'FETCH_WEATHER_FAILURE':
      return { ...state, weatherLoading: false, error: action.payload };

    case 'FETCH_FORECAST_REQUEST':
      return { ...state, forecastLoading: true, error: null };

    case 'FETCH_FORECAST_SUCCESS':
      return { ...state, forecastLoading: false, forecastData: action.payload };

    case 'FETCH_FORECAST_FAILURE':
      return { ...state, forecastLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default weatherReducer;
