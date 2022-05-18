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
  isLoadingOnBoard: boolean;
}

const initialState: IBoardState = {
  columns: [],
  isLoadingOnBoard: true,
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
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();
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
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();

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
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      const parsed = await res.json();

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingOnBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.isLoadingOnBoard = false;
      })
      .addCase(fetchBoard.rejected, () => {})
      .addCase(fetchCreateTask.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchCreateTask.fulfilled, () => {})
      .addCase(fetchCreateTask.rejected, () => {})
      .addCase(fetchDeleteTask.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchDeleteTask.fulfilled, () => {})
      .addCase(fetchDeleteTask.rejected, () => {})
      .addCase(fetchCreateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchCreateColumn.fulfilled, () => {})
      .addCase(fetchCreateColumn.rejected, () => {})
      .addCase(fetchUpdateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchUpdateColumn.fulfilled, () => {})
      .addCase(fetchUpdateColumn.rejected, () => {})
      .addCase(fetchDeleteColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
      })
      .addCase(fetchDeleteColumn.fulfilled, () => {})
      .addCase(fetchDeleteColumn.rejected, () => {})
      .addDefaultCase(() => {});
  },
});

export const columnsSelector = (state: IRootState) => state.board.columns;
export const isLoadingOnBoardSelector = (state: IRootState) => state.board.isLoadingOnBoard;

export default boardSlice.reducer;
