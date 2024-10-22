import serverErrorHandler from '@/utils/serverErrorHandler';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { SWRConfiguration } from 'swr';

// Default fetcher for SWR using Axios
export const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

// Interface for Server Error Response
export interface IServerErrorResponse {
  errors?: Record<string, string>;
  success: boolean;
  message: string;
}

export interface IFormErrors {
  [key: string]: string | undefined | null;
}

// SWR Default Configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshWhenOffline: false,
  shouldRetryOnError: true,
  onError: (error: AxiosError<IServerErrorResponse>) => {
    serverErrorHandler(error);
  },
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404.
    if (error.status === 404) return;

    // Only retry up to 10 times.
    if (retryCount >= 10) return;

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

// Function to send a POST request
export async function sendPostRequest<T>(url: string, { arg }: { arg: T }) {
  return axios
    .post(url, arg)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

// Function to send a PUT request
export async function sendPutRequest<T>(url: string, { arg }: { arg: T }) {
  return axios
    .put(url, arg)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

// Function to send a Delete request
export async function sendDeleteRequest<T extends AxiosRequestConfig>(
  url: string,
  data?: T['data']
) {
  return axios
    .delete(url, { data: data?.arg?.data })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}
