import axios from 'axios';
import { BACKEND_BASE_URL } from './config';

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  // Add token only if the baseURL matches one of the URLs in authRequiredUrls
  if (token && config.url?.includes(BACKEND_BASE_URL)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
