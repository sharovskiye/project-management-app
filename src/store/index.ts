import { configureStore } from '@reduxjs/toolkit';
import app from './boardSlice';

export const store = configureStore({
  reducer: {
    app,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
