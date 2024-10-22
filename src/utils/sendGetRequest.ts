import { IServerErrorResponse } from '@/api/swrConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Helper Function to Process Axios Errors
function processAxiosError(error: AxiosError<IServerErrorResponse>) {
  if (error.response) {
    // Handle specific status codes if needed
    switch (error.response.status) {
      case 400:
        // Client errors
        console.error('Bad Request', error.response.data);
        break;
      case 401:
        // Unauthorized - perhaps redirect to login?
        console.error('Unauthorized access');
        break;
      case 500:
        // Server error
        console.error('Internal server error', error.response.data);
        break;
      default:
        console.error('Unexpected error', error.response.data);
    }
  } else if (error.request) {
    // Handle network errors or timeouts
    console.error('Network error: No response received', error.request);
  } else {
    // Handle other unexpected errors
    console.error('Error in setting up the request', error.message);
  }

  // Re-throw the error to be caught by the caller
  throw error;
}

// Function to send a GET request
export async function sendGetRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw processAxiosError(error as AxiosError<IServerErrorResponse>);
  }
}
