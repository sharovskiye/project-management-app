import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchUsers } from './usersSlice';
import { IRootState } from '.';
import { apiBase } from '../const/const';
import { IGetPerson } from '../services/type';
import { setAuthorized } from './usersSlice';

export type IGetPersonForEdit = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type IEditProfileInitState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: IEditProfileInitState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const fetchEditProfile = createAsyncThunk<unknown, IGetPersonForEdit>(
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
        if (res.status === 401) {
          dispatch(setAuthorized(false));
        }
        throw new Error(parsed.message);
      }
      dispatch(fetchUsers(''));
      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteProfile = createAsyncThunk<unknown, IGetPerson>(
  'editProfile/fetchDeleteProfile',
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
      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchEditProfile.fulfilled, (state) => {
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
