import { fetcher } from '@/api/swrConfig';
import { CURRENT_WEATHER_URL, FIVE_DAY_FORECAST_URL } from '@/api/urls';
import { DB_COLLECTIONS } from '@/config/config';
import useAuth from '@/hooks/useAuth';
import weatherReducer, {
  initialWeatherState,
  IWeatherState,
} from '@/reducer/weatherReducer';
import { ILocation, ISaveLocation } from '@/types/location';
import { IForecastData, IWeatherData } from '@/types/weather';
import { getDocumentsByField } from '@/utils/firestoreService';
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import useSWRMutation from 'swr/mutation';

interface IWeatherContext extends IWeatherState {
  location: ILocation | null;
  setLocation: (location: ILocation) => void;
  fetchWeatherData: () => Promise<void>;
  fetchSavedLocations: () => Promise<void>;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  // useSWRMutation for weather data
  const { trigger: fetchWeatherTrigger } = useSWRMutation<IWeatherData>(
    state.location
      ? CURRENT_WEATHER_URL(state.location?.lat, state.location?.lon)
      : null,
    fetcher
  );

  const { trigger: fetchForecastTrigger } = useSWRMutation<IForecastData>(
    state.location
      ? FIVE_DAY_FORECAST_URL(state.location?.lat, state.location?.lon)
      : null,
    fetcher
  );

  // Fetch current weather and forecast data
  const fetchWeatherData = useCallback(async () => {
    if (!state.location) return;

    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const weatherData = await fetchWeatherTrigger();
      dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: weatherData });

      const forecastData = await fetchForecastTrigger();
      dispatch({ type: 'FETCH_FORECAST_SUCCESS', payload: forecastData });
    } catch (err) {
      console.error('🚀 ~ fetchWeatherData ~ err:', err);
      dispatch({
        type: 'FETCH_WEATHER_FAILURE',
        payload: 'Failed to fetch weather data.',
      });
      dispatch({
        type: 'FETCH_FORECAST_FAILURE',
        payload: 'Failed to fetch forecast data.',
      });
    }
  }, [state.location, fetchWeatherTrigger, fetchForecastTrigger]);

  // Fetch saved locations from Firestore
  const fetchSavedLocations = useCallback(async () => {
    if (user?.id) {
      dispatch({ type: 'FETCH_SAVED_LOCATIONS_REQUEST' });

      try {
        const savedLocations = await getDocumentsByField<ISaveLocation>(
          DB_COLLECTIONS.location,
          'userId',
          user.id
        );

        dispatch({
          type: 'FETCH_SAVED_LOCATIONS_SUCCESS',
          payload: savedLocations,
        });
      } catch (error) {
        console.error('Error fetching location data: ', error);
        dispatch({
          type: 'FETCH_SAVED_LOCATIONS_FAILURE',
          payload: 'Failed to fetch saved locations.',
        });
      }
    }
  }, [user?.id]);

  // Set the current location
  const setLocation = (location: ILocation) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  useEffect(() => {
    if (user?.id) {
      fetchSavedLocations();
    }
  }, [user?.id, fetchSavedLocations]);

  useEffect(() => {
    if (state.location) {
      fetchWeatherData();
    }
  }, [state.location, fetchWeatherData]);

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        setLocation,
        fetchWeatherData,
        fetchSavedLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
