import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewPerson, signIn } from '../services/api';
import { IGetPerson, IPerson } from '../services/type';
import { ISignInUpInitState } from './type';

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
  errorCode: null,
};

export const fetchSignUp = createAsyncThunk<IGetPerson, IPerson>(
  'signUp/fetchSignUp',
  async (payload, { rejectWithValue, dispatch }) => {
    const res = await createNewPerson(payload);

    try {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const personData: IGetPerson = await res.json();

      const { login, password } = payload;

      dispatch(fetchSignIn({ login, password }));

      return personData;
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

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const { token } = await res.json();

      dispatch(getUserData(payload));
      dispatch(setLogin(payload.login));

      return token;
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
        state.errorCode = action.payload;
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
        state.errorCode = action.payload;
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
