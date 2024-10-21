export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const LOCATION_API_BASE_URL = (query: string) =>
  `https://api.locationiq.com/v1/autocomplete.php?key=${
    import.meta.env.VITE_LOCATIONIQ_API_KEY
  }&q=${query}&limit=5&format=json`;
