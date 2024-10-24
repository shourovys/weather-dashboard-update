import { INIT_LOCATION } from '@/data/initLocations';
import { ILocation } from '@/types/location';
import { IForecastData, IWeatherData } from '@/types/weather';
import { ISaveLocation } from './../types/location';

export const weatherActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_WEATHER_REQUEST: 'FETCH_WEATHER_REQUEST',
  FETCH_WEATHER_SUCCESS: 'FETCH_WEATHER_SUCCESS',
  FETCH_WEATHER_FAILURE: 'FETCH_WEATHER_FAILURE',
  FETCH_FORECAST_REQUEST: 'FETCH_FORECAST_REQUEST',
  FETCH_FORECAST_SUCCESS: 'FETCH_FORECAST_SUCCESS',
  FETCH_FORECAST_FAILURE: 'FETCH_FORECAST_FAILURE',
  FETCH_SAVED_LOCATIONS_REQUEST: 'FETCH_SAVED_LOCATIONS_REQUEST',
  FETCH_SAVED_LOCATIONS_SUCCESS: 'FETCH_SAVED_LOCATIONS_SUCCESS',
  FETCH_SAVED_LOCATIONS_FAILURE: 'FETCH_SAVED_LOCATIONS_FAILURE',
} as const;

type ActionType = typeof weatherActionTypes;

export interface IWeatherState {
  location: ILocation | null;
  weatherData: IWeatherData | null;
  forecastData: IForecastData | null;
  savedLocationsData: ISaveLocation[] | null;
  weatherLoading: boolean;
  forecastLoading: boolean;
  savedLocationsLoading: boolean;
  error: string | null;
}

type WeatherAction =
  | { type: ActionType['SET_LOCATION']; payload: ILocation }
  | { type: ActionType['FETCH_REQUEST'] }
  | { type: ActionType['FETCH_WEATHER_REQUEST'] }
  | { type: ActionType['FETCH_WEATHER_SUCCESS']; payload: IWeatherData }
  | { type: ActionType['FETCH_WEATHER_FAILURE']; payload: string }
  | { type: ActionType['FETCH_FORECAST_REQUEST'] }
  | { type: ActionType['FETCH_FORECAST_SUCCESS']; payload: IForecastData }
  | { type: ActionType['FETCH_FORECAST_FAILURE']; payload: string }
  | { type: ActionType['FETCH_SAVED_LOCATIONS_REQUEST'] }
  | {
      type: ActionType['FETCH_SAVED_LOCATIONS_SUCCESS'];
      payload: ISaveLocation[];
    }
  | { type: ActionType['FETCH_SAVED_LOCATIONS_FAILURE']; payload: string };

export const initialWeatherState: IWeatherState = {
  location: INIT_LOCATION[0],
  weatherData: null,
  forecastData: null,
  savedLocationsData: INIT_LOCATION.slice(1),
  weatherLoading: false,
  forecastLoading: false,
  savedLocationsLoading: false,
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

    case 'FETCH_SAVED_LOCATIONS_REQUEST':
      return { ...state, savedLocationsLoading: true, error: null };

    case 'FETCH_SAVED_LOCATIONS_SUCCESS':
      if (action.payload.length > 0) {
        return {
          ...state,
          savedLocationsLoading: false,
          savedLocationsData: action.payload,
        };
      }

      return {
        ...state,
        savedLocationsLoading: false,
      };

    case 'FETCH_SAVED_LOCATIONS_FAILURE':
      return { ...state, savedLocationsLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default weatherReducer;
