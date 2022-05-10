import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewPerson } from '../services/api';
import { IGetPerson, IPerson } from '../services/type';
import { ISignUpInitState } from './type';

const initialState: ISignUpInitState = {
  userData: {
    id: '',
    name: '',
    login: '',
  },
  loading: 'idle',
};

export const fetchSignUp = createAsyncThunk<IGetPerson, IPerson>(
  'signUp/fetchSignUp',
  async (payload, { rejectWithValue }) => {
    const res = await createNewPerson(payload);

    try {
      if (!res.ok) {
        throw new Error('Server error');
      }

      const personData: IGetPerson = await res.json();

      return personData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<IGetPerson>) => {
        state.userData = action.payload;
        state.loading = 'succeeded';
        console.log(state);
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const signUpReducer = signUpSlice.reducer;
