import { CURRENT_WEATHER_URL, FIVE_DAY_FORECAST_URL } from '@/api/urls';
import weatherReducer, { initialWeatherState } from '@/reducer/weatherReducer';
import { ILocation } from '@/types/location';
import { IForecastData, IWeatherData } from '@/types/weather';
import { sendGetRequest } from '@/utils/sendGetRequest';
import React, { createContext, useEffect, useReducer } from 'react';

interface IWeatherContext {
  location: ILocation | null;
  setLocation: (location: ILocation) => void;
  weatherData: IWeatherData | null;
  forecastData: IForecastData | null;
  fetchWeatherData: () => Promise<void>;
  weatherLoading: boolean;
  forecastLoading: boolean;
  error: string | null;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  const fetchWeatherData = async () => {
    if (!state.location) return;

    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const weatherData = await sendGetRequest<IWeatherData>(
        CURRENT_WEATHER_URL(state.location.lat, state.location.lon)
      );

      const forecastData = await sendGetRequest<IForecastData>(
        FIVE_DAY_FORECAST_URL(state.location.lat, state.location.lon)
      );

      dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: weatherData });
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
        forecastData: state.forecastData,
        setLocation,
        fetchWeatherData,
        weatherLoading: state.weatherLoading,
        forecastLoading: state.forecastLoading,
        error: state.error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
