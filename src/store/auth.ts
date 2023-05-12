import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authService } from '../services';
import { LoginCredentials } from '../models';
import { Env } from '../config/env';
import { getProfile, clearProfile } from './profile';
import { initGame, resetGame } from './game';

export const setTokenInStorage = (token?: string | null, refreshToken?: string) => {
  console.log('settokeninstorage');
  if (token) {
    localStorage.setItem(Env.API_TOKEN_KEY, token);
  } else if (refreshToken) {
    localStorage.setItem(Env.API_REFRESH_TOKEN_KEY, refreshToken);
  } else {
    localStorage.removeItem(Env.API_TOKEN_KEY);
    localStorage.removeItem(Env.API_REFRESH_TOKEN_KEY);
  }
};

export interface AuthState {
  loading: boolean;
  token: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    error: null,
    loading: false,
  } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      console.log('setToken auth.ts');
      state.token = action.payload;
      setTokenInStorage(action.payload);
    },
    initToken(state) {
      console.log('initToken auth.ts');
      state.token = localStorage.getItem(Env.API_TOKEN_KEY);
    },
  },
});

const { actions } = authSlice;

export const authReducer = authSlice.reducer;

export const initToken = () => async (dispatch: AppDispatch) => {
  dispatch(actions.initToken());
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    console.log('todo logout');
    await localStorage.removeItem(Env.API_TOKEN_KEY);
    // await authService.logout(localStorage.getItem(Env.API_REFRESH_TOKEN_KEY));
    // await authService.logout();
  } finally {
    dispatch(actions.setToken(null));
    dispatch(clearProfile());
    dispatch(resetGame());
  }
};

export const login =
  ({ credentials }: { credentials: LoginCredentials }) =>
  async (dispatch: AppDispatch) => {
    console.log('login auth.ts');
    const { token } = await authService.login(credentials);

    dispatch(actions.setToken(token?.accessToken || null));
    console.log('login auth.ts, set token');

    setTokenInStorage(token.accessToken, token.refreshToken);
    console.log('login auth.ts');

    await dispatch(getProfile());
    await dispatch(initGame());

    return token;
  };

export const selectIsLoggedIn = (state: ApplicationState) => {
  return Boolean(state.profile.profile);
};
