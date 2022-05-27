import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewPerson, signIn } from '../services/api';
import { IGetPerson, IPerson } from '../services/type';
import { ISignInUpInitState } from './type';
import { setAuthorized } from './usersSlice';

const initialState: ISignInUpInitState = {
  token: '',
  login: '',
  setUserData: {
    name: '',
    login: '',
    password: '',
  },
  getUserData: {
    id: '',
    name: '',
    login: '',
  },
  loading: 'idle',
  signConteiner: 'one',
  errorMessage: '',
};

export const fetchSignUp = createAsyncThunk<IGetPerson, IPerson>(
  'signUp/fetchSignUp',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await createNewPerson(payload);
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      const { login, password } = payload;

      dispatch(fetchSignIn({ login, password }));

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchSignIn = createAsyncThunk<string, IPerson>(
  'signIn/fetchSignIn',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await signIn(payload);
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      dispatch(getUserData(payload));
      dispatch(setLogin(payload.login));
      dispatch(setAuthorized(true));

      return parsed.token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signInUpSlice = createSlice({
  name: 'signInUp',
  initialState,
  reducers: {
    getUserData(state, action: PayloadAction<IPerson>) {
      state.setUserData = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    getTokenWithLocalStorage(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    changeloading(state, action: PayloadAction<'idle'>) {
      state.loading = action.payload;
    },
    changeSignConteiner(state, action: PayloadAction<string>) {
      state.signConteiner = action.payload;
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
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<IGetPerson>) => {
        state.getUserData = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  getUserData,
  getTokenWithLocalStorage,
  changeloading,
  changeSignConteiner,
  setLogin,
} = signInUpSlice.actions;

export const signInUpReducer = signInUpSlice.reducer;
