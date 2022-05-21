import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IRootState } from '.';
import { IBoard, IColumn, INewColumn, INewTask, ITask } from '../components/Board/interface';
import { IGetPerson } from '../services/type';

enum Path {
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  users = 'users',
}

enum Method {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

interface IBoardState {
  boardId: string;
  columns?: IColumn[];
  isLoadingOnBoard: boolean;
  isOpenModal: boolean;
  users: IGetPerson[];
  isError: boolean;
  errorCode: number | null | unknown;
}

const initialState: IBoardState = {
  boardId: '',
  columns: [],
  isLoadingOnBoard: true,
  isOpenModal: false,
  users: [],
  isError: false,
  errorCode: null,
};

const apiBase = 'https://pma-team22.herokuapp.com';

export const fetchBoard = createAsyncThunk<IBoard, string>(
  'board/fetchBoard',
  async (boardId, { rejectWithValue, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${apiBase}/${Path.boards}/${boardId}`;
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        throw new Error(`${res.status}`);
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
  async (newTask, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const { title, order, description, userId, boardId, columnId } = newTask;
    const body = JSON.stringify({ title, order, description, userId });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const parsed = await res.json();

      dispatch(fetchBoard(boardId));

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk<unknown, ITask>(
  'board/fetchDeleteTask',
  async (task, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const { id, boardId, columnId } = task;
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}/${id}`;
    try {
      const res = await fetch(url, { headers, method: Method.DELETE });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      dispatch(fetchBoard(boardId));

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCreateColumn = createAsyncThunk<IColumn, INewColumn>(
  'board/fetchCreateColumn',
  async (newColumn, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const { title, order } = newColumn;
    const body = JSON.stringify({ title, order });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const parsed = await res.json();

      dispatch(fetchBoard(boardId));

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdateColumn = createAsyncThunk<unknown, IColumn>(
  'board/fetchUpdateColumn',
  async (column, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const { id, title, order } = column;
    const body = JSON.stringify({ title, order });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${id}`;
    try {
      const res = await fetch(url, { headers, body, method: Method.PUT });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      dispatch(fetchBoard(boardId));

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk<unknown, IColumn>(
  'board/fetchDeleteColumn',
  async (column, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const { id } = column;
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${id}`;
    try {
      const res = await fetch(url, { headers, method: Method.DELETE });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      dispatch(fetchBoard(boardId));

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUsers = createAsyncThunk<IGetPerson[], unknown>(
  'board/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${apiBase}/${Path.users}`;
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const parsed = await res.json();

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingOnBoard = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.isLoadingOnBoard = false;
        state.isOpenModal = false;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchCreateTask.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchCreateTask.fulfilled, () => {})
      .addCase(fetchCreateTask.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchDeleteTask.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchDeleteTask.fulfilled, () => {})
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchCreateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchCreateColumn.fulfilled, () => {})
      .addCase(fetchCreateColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchUpdateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchUpdateColumn.fulfilled, () => {})
      .addCase(fetchUpdateColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchDeleteColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchDeleteColumn.fulfilled, () => {})
      .addCase(fetchDeleteColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.errorCode = action.payload;
        state.isError = true;
      })
      .addDefaultCase(() => {});
  },
});

export const { setBoardId, setIsOpenModal } = boardSlice.actions;

export const columnsSelector = (state: IRootState) => state.board.columns;
export const isLoadingOnBoardSelector = (state: IRootState) => state.board.isLoadingOnBoard;
export const isOpenModalSelector = (state: IRootState) => state.board.isOpenModal;
export const usersSelector = (state: IRootState) => state.board.users;
export const isErrorBoardSelector = (state: IRootState) => state.board.isError;
export const errorCodeBoardSelector = (state: IRootState) => state.board.errorCode;

export default boardSlice.reducer;
