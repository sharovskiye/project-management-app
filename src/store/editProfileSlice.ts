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
  loading: 'idle' | 'pending' | 'succeeded' | 'error';
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
  loading: 'idle',
  errorMessage: '',
};

export const fetchEditProfile = createAsyncThunk<unknown, IGetPersonForEdit>(
  'editProfile/fetchEditProfile',
  async (user, { rejectWithValue, getState }) => {
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
    changeloading(state, action: PayloadAction<'idle'>) {
      state.loading = action.payload;
    },
  },
  /* extraReducers: (builder) => {
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
export const { getUserData, getTokenWithLocalStorage, changeloading, setLogin } =
  editProfileSlice.actions;

export const editProfileReducer = editProfileSlice.reducer;
