import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { apiBase } from '../const/const';
import { IGetPerson } from '../services/type';

interface IUsersState {
  isError: boolean;
  errorMessage: string;
  users: IGetPerson[];
}

const initialState: IUsersState = {
  isError: false,
  errorMessage: '',
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
  reducers: {},
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

export const usersSelector = (state: IRootState) => state.users.users;
export const errorMessage = (state: IRootState) => state.users.errorMessage;
export const users = usersSlice.reducer;
