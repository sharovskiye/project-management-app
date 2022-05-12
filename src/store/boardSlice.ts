import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { IBoard } from '../components/Board/interface';
import { mockToken } from './mockFiles';

enum Path {
  boards = 'boards/',
}

// export interface IBoardState {}

const initialState = {};

const headers: HeadersInit = {
  accept: 'application/json',
  Authorization: `Bearer ${mockToken}`,
};

const apiBase = 'https://pma-team22.herokuapp.com/';

export const fetchBoard = createAsyncThunk<IBoard, string>(
  'board/fetchBoard',
  async (boardId, { rejectWithValue }) => {
    const url = `${apiBase}${Path.boards}${boardId}`;
    try {
      const res = await fetch(url, { headers });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        console.log('pending');
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(fetchBoard.rejected, (state, errorMessage) => {
        console.log(errorMessage);
      })
      .addDefaultCase(() => {});
  },
});

export default boardSlice.reducer;
