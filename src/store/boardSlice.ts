import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IRootState } from '.';
import { IBoard, IColumn, INewColumn, INewTask, ITask } from '../components/Board/interface';
import { apiBase } from '../const/const';
import { IGetPerson } from '../services/type';
import { Method, Path } from './enum';
import { fetchUsers, setAuthorized } from './usersSlice';

interface IBoardState {
  boardId: string;
  boardTitle: string;
  columns: IColumn[];
  isLoadingOnBoard: boolean;
  isOpenModal: boolean;
  isError: boolean;
  is404: boolean;
  errorMessage: string;
  users: IGetPerson[];
}

const initialState: IBoardState = {
  boardId: '',
  columns: [],
  boardTitle: '',
  isLoadingOnBoard: true,
  isOpenModal: false,
  users: [],
  is404: false,
  isError: false,
  errorMessage: '',
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

        dispatch(setIs404(true));

        throw new Error(parsed.message);
      }

      return parsed;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCreateTask = createAsyncThunk<unknown, INewTask>(
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
      dispatch(fetchBoard(boardId));

      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      dispatch(fetchUsers(''));
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdateTask = createAsyncThunk<unknown, ITask>(
  'board/fetchUpdateTask',
  async (task, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const { title, description, userId, columnId, order, id } = task;
    const body = JSON.stringify({ title, order, description, userId, boardId, columnId });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${columnId}/${Path.tasks}/${id}`;

    try {
      const res = await fetch(url, { headers, body, method: Method.PUT });
      dispatch(fetchBoard(boardId));
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      dispatch(fetchUsers(''));
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdateTaskOrder = createAsyncThunk<unknown, ITask>(
  'board/fetchUpdateTaskOrder',
  async (task, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const { title, description, userId, columnId, order, id, oldColumnId } = task;
    const body = JSON.stringify({ title, order, description, userId, boardId, columnId });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${oldColumnId}/${Path.tasks}/${id}`;

    try {
      const res = await fetch(url, { headers, body, method: Method.PUT });
      const parsed = await res.json();
      if (!res.ok) {
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      dispatch(fetchBoard(boardId));
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
      dispatch(fetchBoard(boardId));
      if (!res.ok) {
        const parsed = await res.json();
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCreateColumn = createAsyncThunk<unknown, INewColumn>(
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
      dispatch(fetchBoard(boardId));
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

export const fetchUpdateColumn = createAsyncThunk<unknown, IColumn>(
  'board/fetchUpdateColumn',
  async (column, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
      board: { boardId, columns },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const { id, title, order } = column;
    const body = JSON.stringify({ title, order });
    const url = `${apiBase}/${Path.boards}/${boardId}/${Path.columns}/${id}`;

    const isUpdate = columns.find((colunm) => colunm.id === id)?.title !== title;

    try {
      const res = await fetch(url, { headers, body, method: Method.PUT });
      if (isUpdate) {
        dispatch(fetchBoard(boardId));
      }

      const parsed = await res.json();

      if (!res.ok) {
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      dispatch(fetchBoard(boardId));
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
      dispatch(fetchBoard(boardId));
      if (!res.ok) {
        const parsed = await res.json();
        throw new Error(parsed.message);
      }

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
    setColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingOnBoard = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
    setIs404: (state, action: PayloadAction<boolean>) => {
      state.is404 = action.payload;
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
        state.boardTitle = action.payload.title;
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
      .addCase(fetchUpdateTask.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchUpdateTask.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchUpdateTaskOrder.pending, (state) => {
        state.isLoadingOnBoard = true;
        state.isError = false;
      })
      .addCase(fetchUpdateTaskOrder.rejected, (state, action) => {
        state.isLoadingOnBoard = false;
        state.errorMessage = action.payload as string;
        state.isError = true;
      })
      .addCase(fetchUpdateTaskOrder.fulfilled, (state) => {
        state.isLoadingOnBoard = false;
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
      .addCase(fetchUpdateColumn.fulfilled, (state) => {
        state.isLoadingOnBoard = false;
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
      .addDefaultCase(() => {});
  },
});

export const { setBoardId, setIsOpenModal, setColumns, setIs404 } = boardSlice.actions;

export const boardSelector = (state: IRootState) => state.board;
export const columnsSelector = (state: IRootState) => state.board.columns;
export const isLoadingOnBoardSelector = (state: IRootState) => state.board.isLoadingOnBoard;
export const isOpenModalSelector = (state: IRootState) => state.board.isOpenModal;
export const isErrorBoardSelector = (state: IRootState) => state.board.isError;
export const errorMessageBoardSelector = (state: IRootState) => state.board.errorMessage;
export const loginsSelector = (state: IRootState) => state.board.users.map((user) => user.login);

export default boardSlice.reducer;
