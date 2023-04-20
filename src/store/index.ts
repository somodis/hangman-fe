import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commonReducer } from './common';
import { profileReducer } from './profile';
import { authReducer } from '../utils/auth';

export const rootReducer = combineReducers({
  common: commonReducer,
  profile: profileReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

declare global {
  type ApplicationState = ReturnType<typeof rootReducer>;

  type AppDispatch = typeof store.dispatch;

  type GetState = () => ApplicationState;
}

declare module 'react-redux' {
  export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
}
