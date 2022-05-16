import { configureStore } from '@reduxjs/toolkit';
import { signInUpReducer } from './signInUpSlice';

export const store = configureStore({
  reducer: {
    signInUp: signInUpReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
