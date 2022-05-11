import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signIn } from '../services/api';
import { IPerson } from '../services/type';
import { ISignInInitState } from './type';

const initialState: ISignInInitState = {
  token: '',
  userData: {
    name: '',
    login: '',
    password: '',
  },
  loading: 'idle',
};

export const fetchSignIn = createAsyncThunk<string, IPerson>(
  'signIn/fetchSignIn',
  async (payload, { rejectWithValue }) => {
    const res = await signIn(payload);

    try {
      if (!res.ok) {
        throw new Error('Server error');
      }

      const token: string = await res.json();
      return token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    getUserData(state, action: PayloadAction<IPerson>) {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const { getUserData } = signInSlice.actions;

export const signInReducer = signInSlice.reducer;
