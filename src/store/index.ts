import { configureStore } from '@reduxjs/toolkit';

import { profileReducer } from './profile';
import { gameReducer } from './game';
import { authReducer } from './auth';
import { scoreReducer } from './scores';

const store = configureStore({
  reducer: {
    game: gameReducer,
    profile: profileReducer,
    auth: authReducer,
    scores: scoreReducer,
  },
});

export default store;

declare global {
  type ApplicationState = ReturnType<typeof store.getState>;

  type AppDispatch = typeof store.dispatch;

  type GetState = () => ApplicationState;
}

declare module 'react-redux' {
  export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
}
