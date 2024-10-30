import axios from 'axios';
import { BACKEND_BASE_URL } from './config';

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  // Add token only if the baseURL matches one of the URLs in authRequiredUrls
  if (token && config.url?.includes(BACKEND_BASE_URL)) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  // Add withCredentials false only if the url matches
  if (config.url?.includes('api.openweathermap.org')) {
    config.withCredentials = false;
  }

  return config;
});

export default api;
