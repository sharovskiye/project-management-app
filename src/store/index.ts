import { configureStore } from '@reduxjs/toolkit';
import { signInReducer } from './signInSlice';
import { signUpReducer } from './signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
