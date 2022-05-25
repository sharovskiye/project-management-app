import { fetchUsers } from './fetchUsers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { apiBase } from '../const/const';
import { IGetPerson, IPerson } from '../services/type';

export type IGetPersonForEdit = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type IEditProfileInitState = {
  token: string;
  login: string;
  setUserData: IPerson;
  getUserData: IGetPersonForEdit;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: IEditProfileInitState = {
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
    password: '',
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const fetchEditProfile = createAsyncThunk<IGetPersonForEdit, IGetPersonForEdit>(
  'editProfile/fetchEditProfile',
  async (user, { rejectWithValue, getState, dispatch }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const { name, login, id, password } = user;
    const body = JSON.stringify({ name, login, password });
    const url = `${apiBase}/users/${id}`;

    try {
      const res = await fetch(url, { headers, body, method: 'PUT' });
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }
      dispatch(fetchUsers(''));
      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteProfile = createAsyncThunk<unknown, IGetPerson>(
  'editProfile/fetchEditProfile',
  async (user, { rejectWithValue, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const { id } = user;
    const url = `${apiBase}/users/${id}`;

    try {
      const res = await fetch(url, { headers, method: 'DELETE' });
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
    changeloading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.getUserData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      });
  },
});

export const editProfileSelector = (state: IRootState) => state.editProfile;
export const isLoadingEditProfileSelector = (state: IRootState) => state.editProfile.isLoading;
export const isErrorEditProfileSelector = (state: IRootState) => state.editProfile.isError;
export const errorMessageEditProfileSelector = (state: IRootState) =>
  state.editProfile.errorMessage;
export const editProfile = editProfileSlice.reducer;
