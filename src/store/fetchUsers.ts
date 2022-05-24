import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { apiBase } from '../const/const';
import { IGetPerson } from '../services/type';

interface IUsersState {
  isError: boolean;
  errorMessage: string;
  authorized: boolean;
  users: IGetPerson[];
}

const initialState: IUsersState = {
  isError: false,
  errorMessage: '',
  authorized: false,
  users: [],
};

export const fetchUsers = createAsyncThunk<IGetPerson[], unknown>(
  'users/fetchUsers',
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addDefaultCase(() => {});
  },
});

export const getDataUserSelector = (state: { users: IUsersState }) => state.users.users;
export const usersSelector = (state: IRootState) => state.usersReducer.users;
export const errorMessage = (state: IRootState) => state.usersReducer.errorMessage;
export const usersReducer = usersSlice.reducer;
