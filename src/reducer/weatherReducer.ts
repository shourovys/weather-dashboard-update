import { ILocation, IWeatherData } from '@/types/weather';

interface IWeatherState {
  location: ILocation | null;
  weatherData: IWeatherData | null;
  loading: boolean;
  error: string | null;
}

type WeatherAction =
  | { type: 'SET_LOCATION'; payload: ILocation }
  | { type: 'FETCH_WEATHER_REQUEST' }
  | { type: 'FETCH_WEATHER_SUCCESS'; payload: IWeatherData }
  | { type: 'FETCH_WEATHER_FAILURE'; payload: string };

export const initialWeatherState: IWeatherState = {
  location: null,
  weatherData: null,
  loading: false,
  error: null,
};

const weatherReducer = (
  state: IWeatherState,
  action: WeatherAction
): IWeatherState => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload, error: null };
    case 'FETCH_WEATHER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_WEATHER_SUCCESS':
      return { ...state, loading: false, weatherData: action.payload };
    case 'FETCH_WEATHER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
