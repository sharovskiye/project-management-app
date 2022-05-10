import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewPerson } from '../services/api';
import { IGetToken, IPerson } from '../services/type';
import { ISignInInitState } from './type';

const initialState: ISignInInitState = {
  token: null,
  loading: 'idle',
};

const fetchSignIn = createAsyncThunk<IGetToken, IPerson>(
  'signUp/fetchSignUp',
  async (payload, { rejectWithValue }) => {
    const res = await createNewPerson(payload);

    try {
      if (!res.ok) {
        throw new Error('Server error');
      }

      const token: IGetToken = await res.json();

      return token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<IGetToken>) => {
        state.token = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const signInReducer = signInSlice.reducer;
