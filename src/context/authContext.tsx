import appApi from '@/config/apiConfig';
import authReducer, { initialState } from '@/reducer/authReducer';
import { AUTH_STATUS, IAuthResponse, IAuthState, IUser } from '@/types/auth';
import { sendAppGetRequest } from '@/utils/sendGetRequest';
import React, {
  createContext,
  useCallback,
  useEffect,
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
}

export const AuthContext = createContext<IAuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('🚀 ~ state:', state);

  // Fetch user details and validate token on initial mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await sendAppGetRequest<IAuthResponse>('/user/me');
        dispatch({
          type: 'login',
          payload: data,
        });
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        localStorage.setItem('token', data.token); // Store token
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        dispatch({ type: 'error' });
        logout(); // If the token is invalid, log the user out
      }
    };

    // Load user and token from local storage on initial mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch({
        type: 'login',
        payload: {
          user: JSON.parse(storedUser),
          token: storedToken,
        },
      });
    } else {
      fetchMe();
    }
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
              type: 'login',
              payload: data,
            });

            localStorage.setItem('token', data.token);

            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            originalRequest._isRetry = true;

            return appApi(originalRequest); // Retry the original request
          } catch (error) {
            console.log('🚀 ~ error:', error);
            dispatch({ type: 'error' });
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
      type: 'login',
      payload: {
        user,
        token,
      },
    });
    localStorage.setItem('token', token);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    dispatch({ type: 'logout' });
    localStorage.removeItem('token');
  }, []);

  // Update user profile in state
  const updateUser = useCallback((user: IUser) => {
    dispatch({
      type: 'updateUser',
      payload: { user },
    });
  }, []);

  // Update authentication status
  const setAuthenticationStatus = useCallback((status: AUTH_STATUS) => {
    dispatch({
      type: 'status',
      payload: { status },
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateUser,
      setAuthenticationStatus,
    }),
    [state, login, logout, updateUser, setAuthenticationStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
