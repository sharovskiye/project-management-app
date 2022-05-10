import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewPerson } from '../services/api';
import { IGetPerson, IPerson } from '../services/type';
import { ISignUpInitState } from './type';

type IReject = {
  rejectWithValue: (value: unknown) => unknown;
};

const initialState: ISignUpInitState = {
  userData: null,
  loading: 'idle',
};

const fetchSignUp = createAsyncThunk(
  'signUp/fetchSignUp',
  async (
    payload: {
      name: string;
      login: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    createNewPerson(payload).then(async (res: Response) => {
      try {
        if (!res.ok) {
          throw new Error('Server error');
        }

        const personData: IGetPerson = await res.json();

        return personData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    });
  }
);

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<IGetPerson>) => {
        state.userData = action.payload;
      });
  },
});

export const signUpReducer = signUpSlice.reducer;
