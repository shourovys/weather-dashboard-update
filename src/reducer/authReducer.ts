import { AUTH_STATUS, IAuthState, IUser } from '@/types/auth';

export const authActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  STATUS: 'STATUS',
  ERROR: 'ERROR',
  OPEN_AUTH_DIALOG: 'OPEN_AUTH_DIALOG',
} as const;

type ActionType = typeof authActionTypes;

type IAuthAction =
  | {
      type: ActionType['LOGIN'];
      payload: { user: IUser; token: string };
    }
  | { type: ActionType['LOGOUT'] }
  | { type: ActionType['UPDATE_USER']; payload: { user: IUser } }
  | { type: ActionType['STATUS']; payload: { status: AUTH_STATUS } }
  | { type: ActionType['ERROR'] }
  | {
      type: ActionType['OPEN_AUTH_DIALOG'];
      payload: { isAuthModalOpen: boolean };
    };

export const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
  isAuthModalOpen: false,
};

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        ...state,
        user: { ...action.payload.user, id: String(action.payload.user.id) },
        token: action.payload.token,
        isAuthenticated: true,
        status: AUTH_STATUS.SUCCEEDED,
        isAuthModalOpen: false,
      };
    case authActionTypes.LOGOUT:
      return {
        ...initialState,
        token: null,
        status: AUTH_STATUS.IDLE,
      };
    case authActionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...action.payload.user, id: String(action.payload.user.id) },
      };
    case authActionTypes.STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case authActionTypes.ERROR:
      return {
        ...state,
        status: AUTH_STATUS.FAILED,
      };
    case authActionTypes.OPEN_AUTH_DIALOG:
      if (action.payload.isAuthModalOpen === true && !state.isAuthenticated) {
        return {
          ...state,
          isAuthModalOpen: true,
          status: AUTH_STATUS.PENDING,
        };
      } else {
        return {
          ...state,
          isAuthModalOpen: false,
          status: AUTH_STATUS.IDLE,
        };
      }
    default:
      return state;
  }
};

export default authReducer;
