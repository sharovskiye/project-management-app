import { configureStore } from '@reduxjs/toolkit';
import { signInUpReducer } from './signInUpSlice';
import board from './boardSlice';
import { mainBoardReducers } from './mainBoardSlice';

export const store = configureStore({
  reducer: {
    signInUp: signInUpReducer,
    board,
    mainBoard: mainBoardReducers,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
