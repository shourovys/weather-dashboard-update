import { fetcher } from '@/api/swrConfig';
import { AUTH } from '@/api/urls';
import api from '@/config/apiConfig';
import { useToast } from '@/hooks/useToasts';
import authReducer, { initialState } from '@/reducer/authReducer';
import { AUTH_STATUS, IAuthResponse, IAuthState, IUser } from '@/types/auth';
import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';

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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { trigger: fetchMeTrigger } = useSWRMutation<IAuthResponse>(
    AUTH.ME,
    fetcher,
    {
      onSuccess: (data) => {
        console.log('🚀 ~ data:', data);
        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        localStorage.setItem('token', data.token);
      },
      onError: () => {
        dispatch({ type: 'ERROR' });
      },
    }
  );

  const { trigger: refreshMeTrigger } = useSWRMutation<IAuthResponse>(
    AUTH.REFRESH_TOKEN,
    fetcher
  );

  const { toast } = useToast();

  // Fetch user details and validate token on initial mount
  useLayoutEffect(() => {
    dispatch({
      type: 'STATUS',
      payload: { status: AUTH_STATUS.PENDING },
    });

    fetchMeTrigger();
  }, []);

  // Response interceptor to handle token refresh
  useLayoutEffect(() => {
    dispatch({
      type: 'STATUS',
      payload: { status: AUTH_STATUS.PENDING },
    });

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const data = await refreshMeTrigger();

            dispatch({
              type: 'LOGIN',
              payload: data,
            });

            localStorage.setItem('token', data.token);

            originalRequest.headers.Authorization = `Bearer ${data.token}`;

            return api(originalRequest); // Retry the original request
          } catch (error) {
            console.log('🚀 ~ error:', error);
            navigate('/');
            dispatch({ type: 'ERROR' });
            dispatch({ type: 'LOGOUT' });
            toast({
              title: 'Login Failed',
              description: 'Your session has expired. Please login again.',
              duration: 3000,
            });
          }
        }
        throw error;
      }
    );
  }, [state.status]);

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
    toast({
      title: 'Login Success',
      description: 'You have successfully logged in.',
      duration: 3000,
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    navigate('/');
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    toast({
      title: 'Logout Success',
      description: 'Your session has been logged out.',
      duration: 3000,
    });
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
