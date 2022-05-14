import { configureStore } from '@reduxjs/toolkit';
import board from './boardSlice';

export const store = configureStore({
  reducer: {
    board,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
