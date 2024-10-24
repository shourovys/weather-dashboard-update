import appApi from '@/config/apiConfig';
import authReducer, { initialState } from '@/reducer/authReducer';
import { AUTH_STATUS, IAuthResponse, IAuthState, IUser } from '@/types/auth';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';

// Extend AxiosRequestConfig to include _isRetry
// interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _isRetry?: boolean;
// }

export interface IAuthContextType extends IAuthState {
  login: (user: IUser, token: string) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
  setAuthenticationStatus: (status: AUTH_STATUS) => void;
  openAuthDialog: (isAuthModalOpen: boolean) => void;
}

export const AuthContext = createContext<IAuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fetch user details and validate token on initial mount
  useLayoutEffect(() => {
    dispatch({
      type: 'STATUS',
      payload: { status: AUTH_STATUS.PENDING },
    });
    const fetchMe = async () => {
      try {
        const data = await sendAppGetRequest<IAuthResponse>('/user/me');
        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        localStorage.setItem('token', data.token); // Store token
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        dispatch({ type: 'ERROR' });
        logout(); // If the token is invalid, log the user out
      }
    };

    fetchMe();
  }, []);

  // // Request interceptor to add authorization token
  // useLayoutEffect(() => {
  //   const authInterceptor = appApi.interceptors.request.use(
  //     (config: ICustomAxiosRequestConfig) => {
  //       // Ensure headers are initialized if undefined
  //       config.headers = config.headers ?? {};

  //       config.headers.Authorization =
  //         !config._isRetry && state.token
  //           ? Bearer ${state.token}
  //           : config.headers.Authorization;

  //       return config;
  //     }
  //   );

  //   return () => {
  //     appApi.interceptors.request.eject(authInterceptor);
  //   };
  // }, [state.token]);

  // Response interceptor to handle token refresh
  useLayoutEffect(() => {
    dispatch({
      type: 'STATUS',
      payload: { status: AUTH_STATUS.PENDING },
    });
    const refreshInterceptor = appApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
          try {
            const data = await sendAppGetRequest<IAuthResponse>(
              '/user/refreshToken'
            );

            dispatch({
              type: 'LOGIN',
              payload: data,
            });

            localStorage.setItem('token', data.token);

            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            originalRequest._isRetry = true;

            return appApi(originalRequest); // Retry the original request
          } catch (error) {
            console.log('🚀 ~ error:', error);
            dispatch({ type: 'ERROR' });
            logout();
          }
        }
        throw error;
      }
    );

    return () => {
      appApi.interceptors.response.eject(refreshInterceptor); // Cleanup on unmount
    };
  }, [state.token]);

  // Login function to store token and user data
  const login = useCallback((user: IUser, token: string) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        token,
      },
    });
    localStorage.setItem('token', token);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  }, []);

  // Update user profile in state
  const updateUser = useCallback((user: IUser) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { user },
    });
  }, []);

  // Update authentication status
  const setAuthenticationStatus = useCallback((status: AUTH_STATUS) => {
    dispatch({
      type: 'STATUS',
      payload: { status },
    });
  }, []);

  // Update Modal status
  const openAuthDialog = useCallback((isAuthModalOpen: boolean) => {
    dispatch({
      type: 'OPEN_AUTH_DIALOG',
      payload: { isAuthModalOpen },
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      setAuthenticationStatus,
      openAuthDialog,
    }),
    [state, login, logout, updateUser, setAuthenticationStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
