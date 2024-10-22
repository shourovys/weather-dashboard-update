import { IFormErrors, IServerErrorResponse } from '@/api/swrConfig';
import { AxiosError } from 'axios';

// Generic Error Handler for Server-Side Validation Errors
const serverErrorHandler = (
  error: AxiosError<IServerErrorResponse>,
  errorStateSetter?: (state: IFormErrors) => void
) => {
  if (error.response && error.response.data) {
    const { data } = error.response;
    const serverErrors: IFormErrors = {};

    // Populate form errors from the server if present
    if (data.errors) {
      for (const key in data.errors) {
        serverErrors[key] = data.errors[key];
      }
    }

    // Optionally show a toast notification or UI feedback
    // warningToast(data.message || 'An error occurred.');

    if (errorStateSetter) errorStateSetter(serverErrors);
  } else {
    // Handle cases where the response is missing
    console.error('Error without response:', error);
    // Optionally show a generic error message
    // warningToast('Something went wrong. Please try again.');
  }
};

export default serverErrorHandler;
