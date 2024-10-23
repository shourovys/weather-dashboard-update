import { AUTH_STATUS, IAuthState, IUser } from '@/types/auth';

// Using a discriminated union for AuthAction
type IAuthAction =
  | {
      type: 'login';
      payload: { user: IUser; token: string };
    }
  | { type: 'logout' }
  | { type: 'updateUser'; payload: { user: IUser } }
  | { type: 'status'; payload: { status: AUTH_STATUS } }
  | { type: 'error' };

export const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  status: AUTH_STATUS.IDLE,
};

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: { ...action.payload.user, id: String(action.payload.user.id) },
        token: action.payload.token,
        isAuthenticated: true,
        status: AUTH_STATUS.SUCCEEDED,
      };
    case 'logout':
      return {
        ...initialState,
        status: AUTH_STATUS.IDLE,
      };
    case 'updateUser':
      return {
        ...state,
        user: { ...action.payload.user, id: String(action.payload.user.id) },
      };
    case 'status':
      return {
        ...state,
        status: action.payload.status,
      };
    case 'error':
      return {
        ...state,
        status: AUTH_STATUS.FAILED,
      };
    default:
      return state;
  }
};

export default authReducer;
