import { CURRENT_WEATHER_URL } from '@/api/urls';
import weatherReducer, { initialWeatherState } from '@/reducer/weatherReducer';
import { ILocation, IWeatherData } from '@/types/weather';
import { sendGetRequest } from '@/utils/sendGetRequest';
import React, { createContext, useEffect, useReducer } from 'react';

interface IWeatherContext {
  location: ILocation | null;
  setLocation: (location: ILocation) => void;
  weatherData: IWeatherData | null;
  fetchWeatherData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  const fetchWeatherData = async () => {
    if (!state.location) return;

    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    try {
      const data = await sendGetRequest<IWeatherData>(
        CURRENT_WEATHER_URL(state.location.lat, state.location.lon)
      );

      dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: data });
    } catch (err) {
      console.error('🚀 ~ fetchWeatherData ~ err:', err);
      dispatch({
        type: 'FETCH_WEATHER_FAILURE',
        payload: 'Failed to fetch weather data.',
      });
    }
  };

  useEffect(() => {
    if (state.location) {
      fetchWeatherData();
    }
  }, [state.location]);

  const setLocation = (location: ILocation) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  return (
    <WeatherContext.Provider
      value={{
        location: state.location,
        weatherData: state.weatherData,
        setLocation,
        fetchWeatherData,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
