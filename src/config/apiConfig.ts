import axios from 'axios';
import { BACKEND_BASE_URL } from './config';

const appApi = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

appApi.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default appApi;
