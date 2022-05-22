import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IRootState } from '.';
import { IBoard, IColumn, INewColumn, INewTask, ITask } from '../components/Board/interface';
import { apiBase } from '../const/const';
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
  columns: IColumn[];
  isLoadingOnBoard: boolean;
  isOpenModal: boolean;
  users: IGetPerson[];
  isError: boolean;
  errorMessage: string;
  authorized: boolean;
}

const initialState: IBoardState = {
  boardId: '',
  columns: [],
  isLoadingOnBoard: true,
  isOpenModal: false,
  users: [],
  isError: false,
  errorMessage: '',
  authorized: false,
};

export const fetchBoard = createAsyncThunk<IBoard, string>(
  'board/fetchBoard',
  async (boardId, { rejectWithValue, getState, dispatch }) => {
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
      const parsed = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(setAuthorized(false));
        }
        throw new Error(parsed.message);
      }

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

    const { title, description, userId, boardId, columnId } = newTask;
    const body = JSON.stringify({ title, description, userId });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}`;

    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

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
        const parsed = await res.json();
        throw new Error(parsed.message);
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

    const { title } = newColumn;
    const body = JSON.stringify({ title });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}`;

    try {
      const res = await fetch(url, { headers, body, method: Method.POST });
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

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
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
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
        const parsed = await res.json();
        throw new Error(parsed.message);
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
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
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
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchCreateTask.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchCreateTask.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchDeleteTask.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchCreateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchCreateColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchUpdateColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchUpdateColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchDeleteColumn.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchDeleteColumn.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
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

export const { setBoardId, setIsOpenModal, setAuthorized } = boardSlice.actions;

export const boardSelector = (state: IRootState) => state.board;
export const columnsSelector = (state: IRootState) => state.board.columns;
export const isLoadingOnBoardSelector = (state: IRootState) => state.board.isLoadingOnBoard;
export const isOpenModalSelector = (state: IRootState) => state.board.isOpenModal;
export const usersSelector = (state: IRootState) => state.board.users;
export const isErrorBoardSelector = (state: IRootState) => state.board.isError;
export const errorMessageBoardSelector = (state: IRootState) => state.board.errorMessage;
export const authorizedSelector = (state: IRootState) => state.board.authorized;

export default boardSlice.reducer;
