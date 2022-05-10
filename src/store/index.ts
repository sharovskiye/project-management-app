import { configureStore } from '@reduxjs/toolkit';
import { signUpReducer } from './signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
