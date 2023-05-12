import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userService } from '../services';
import { UserModel } from '../models';
import store from '.';

export interface ProfileState {
  loading: boolean;
  profile: UserModel | null;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
  } as ProfileState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserScore: (state, action: PayloadAction<number>) => {
      if (!state.profile) {
        return;
      }
      state.profile.score = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserModel | null>) => {
      state.profile = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
    },
  },
});

const { actions } = profileSlice;

export const profileReducer = profileSlice.reducer;
export const { clearProfile } = actions;

export const getProfile = () => async (dispatch: AppDispatch) => {
  dispatch(actions.setLoading(true));

  const profile = await userService.getProfile();

  dispatch(actions.setProfile(profile || null));

  return profile;
};

export const setUserInGame = (isInGame: boolean) => async (dispatch: AppDispatch) => {
  const user = store.getState().profile.profile;

  if (!user) {
    return;
  }

  dispatch(actions.setProfile({ ...user, isInGame }));
};

export const selectProfile = (state: ApplicationState) => {
  return state.profile.profile;
};

export const selectUserRoles = (state: ApplicationState) => {
  const profile = selectProfile(state);

  return profile?.role;
};
