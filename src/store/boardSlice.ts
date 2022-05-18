import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IRootState } from '.';
import { IBoard, IColumn, INewColumn, INewTask, ITask } from '../components/Board/interface';
import { mockBoardId, mockToken } from './mockFiles';

enum Path {
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
}

enum Method {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export interface IBoardState {
  columns?: IColumn[];
}

const initialState: IBoardState = {
  columns: [],
};

const apiBase = 'https://pma-team22.herokuapp.com';

export const fetchBoard = createAsyncThunk<IBoard, string>(
  'board/fetchBoard',
  async (boardId, { rejectWithValue }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
    });
    const url = `${apiBase}/${Path.boards}/${boardId}`;
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

export const fetchCreateTask = createAsyncThunk<ITask, INewTask>(
  'board/fetchCreateTask',
  async (newTask, { rejectWithValue, dispatch }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
      'Content-Type': 'application/json',
    });
    const { title, order, description, userId, boardId, columnId } = newTask;
    const body = JSON.stringify({ title, order, description, userId });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();
      console.log(parsed);

      dispatch(fetchBoard(mockBoardId));

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk<unknown, ITask>(
  'board/fetchDeleteTask',
  async (task, { rejectWithValue, dispatch }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
    });
    const { id, boardId, columnId } = task;
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}/${id}`;
    try {
      const res = await fetch(url, { headers, method: Method.DELETE });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      dispatch(fetchBoard(mockBoardId));

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCreateColumn = createAsyncThunk<IColumn, INewColumn>(
  'board/fetchCreateColumn',
  async (newColumn, { rejectWithValue, dispatch }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
      'Content-Type': 'application/json',
    });
    const { title, order } = newColumn;
    const body = JSON.stringify({ title, order });
    const url = `${apiBase}/${Path.boards}/${mockBoardId}/${Path.columns}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();
      console.log(parsed);

      dispatch(fetchBoard(mockBoardId));

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdateColumn = createAsyncThunk<unknown, IColumn>(
  'board/fetchUpdateColumn',
  async (column, { rejectWithValue, dispatch }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
      'Content-Type': 'application/json',
    });
    const { id, title, order } = column;
    const body = JSON.stringify({ title, order });
    const url = `${apiBase}/${Path.boards}/${mockBoardId}/${Path.columns}/${id}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.PUT });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      dispatch(fetchBoard(mockBoardId));

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk<unknown, IColumn>(
  'board/fetchDeleteColumn',
  async (column, { rejectWithValue, dispatch }) => {
    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${mockToken}`,
    });
    const { id } = column;
    const url = `${apiBase}/${Path.boards}/${mockBoardId}/${Path.columns}/${id}`;
    try {
      const res = await fetch(url, { headers, method: Method.DELETE });
      console.log('status: ' + res.status);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      dispatch(fetchBoard(mockBoardId));

      return;
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
      .addCase(fetchCreateTask.pending, () => {
        console.log('pending');
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        console.log(action);

        // state.columns = action.payload.columns;
      })
      .addCase(fetchCreateTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(fetchDeleteTask.pending, () => {
        console.log('pending');
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        console.log(action);

        // state.columns = action.payload.columns;
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        console.log(action);
      })
      .addDefaultCase(() => {});
  },
});

export const columnsSelector = (state: IRootState) => state.board.columns;

export default boardSlice.reducer;
