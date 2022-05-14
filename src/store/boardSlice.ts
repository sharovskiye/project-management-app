import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { IBoard, IColumn } from '../components/Board/interface';
import { mockToken } from './mockFiles';

enum Path {
  boards = 'boards/',
}

export interface IBoardState {
  columns?: IColumn[];
}

const initialState: IBoardState = {
  columns: [],
};

const headers = new Headers({
  accept: 'application/json',
  Authorization: `Bearer ${mockToken}`,
});

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
  reducers: {
    setLoading: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, () => {
        console.log('pending');
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        console.log(action);
        state.columns = action.payload.columns;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        console.log(action);
      })
      .addDefaultCase(() => {});
  },
});

export const columnsSelector = (state: RootState) => state.board.columns;

export default boardSlice.reducer;
