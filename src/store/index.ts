import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { profileReducer } from './profile';
import { gameReducer } from './game';

export const rootReducer = combineReducers({
  game: gameReducer,
  profile: profileReducer,
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

// declare module 'react-redux' {
//   export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
// }
