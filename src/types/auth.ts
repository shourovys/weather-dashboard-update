export enum AUTH_STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  status: AUTH_STATUS;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
