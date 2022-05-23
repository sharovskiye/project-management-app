import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { apiBase } from '../const/const';
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
  errorMessage: '',
};

export const fetchEditProfile = createAsyncThunk<IGetPerson[], unknown>(
  'board/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${apiBase}/users`;

    try {
      const res = await fetch(url, { headers });
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editProfileSlice = createSlice({
  name: 'editProfile',
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
  /*  extraReducers: (builder) => {
    builder
      .addCase(fetchEditProfile.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEditProfile.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchEditProfile.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEditProfile.fulfilled, (state, action: PayloadAction<IGetPerson>) => {
        state.getUserData = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      });
  }, */
});
export const {
  getUserData,
  getTokenWithLocalStorage,
  changeloading,
  changeSignConteiner,
  setLogin,
} = editProfileSlice.actions;

export const editProfileReducer = editProfileSlice.reducer;
