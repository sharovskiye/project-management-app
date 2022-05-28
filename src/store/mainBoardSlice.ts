import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICreateBoard, IGetBoard, IMainBoard } from './type';
import { IRootState } from './index';
import { apiBase } from '../const/const';
import { Method, Path } from './boardSlice';
import { setAuthorized } from './usersSlice';

export const fetchCreateBoard = createAsyncThunk<IGetBoard, ICreateBoard>(
  'mainBoard/fetchCreateBoard',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(payload);
    const url = `${apiBase}/${Path.boards}`;

    try {
      const res = await fetch(url, { method: Method.POST, body, headers });
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

export const fetchChangeBoard = createAsyncThunk<unknown, IGetBoard>(
  'mainBoard/fetchChangeBoard',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({ title: payload.title, description: payload.description });
    const url = `${apiBase}/${Path.boards}/${payload.id}`;

    try {
      const res = await fetch(url, { method: Method.PUT, body, headers });
      const parsed = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(setAuthorized(false));
        }
        throw new Error(parsed.message);
      }
      dispatch(fetchGetFullBoards());

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteBoard = createAsyncThunk<unknown, string>(
  'mainBoard/fetchDeleteBoard',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    });
    const url = `${apiBase}/${Path.boards}/${id}`;

    try {
      const res = await fetch(url, { method: Method.DELETE, headers });

      dispatch(fetchGetFullBoards());

      if (!res.ok) {
        const parsed = await res.json();

        if (res.status === 401) {
          dispatch(setAuthorized(false));
        }
        throw new Error(parsed.message);
      }

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchGetFullBoards = createAsyncThunk<IGetBoard[]>(
  'mainBoard/fetchGetFullBoards',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const {
      signInUp: { token },
    } = getState() as IRootState;

    const headers = new Headers({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${apiBase}/${Path.boards}`;

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

const initialState: IMainBoard = {
  isModalOpen: false,
  boardCollection: [
    {
      id: '',
      title: '',
      description: '',
    },
  ],
  idChangedBoard: '',
  idDeletedBoard: '',
  loading: 'idle',
  errorMessage: '',
};

export const mainBoardSlice = createSlice({
  name: 'mainBoard',
  initialState,
  reducers: {
    toggleModalVisible(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    setIdDeletedBoard(state, action: PayloadAction<string>) {
      state.idDeletedBoard = action.payload;
    },
    setIdChangedBoard(state, action: PayloadAction<string>) {
      state.idChangedBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateBoard.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCreateBoard.fulfilled, (state, action) => {
        state.boardCollection.push(action.payload);
        state.loading = 'idle';
      })
      .addCase(fetchCreateBoard.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchGetFullBoards.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGetFullBoards.fulfilled, (state, action) => {
        state.boardCollection = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchGetFullBoards.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchChangeBoard.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchChangeBoard.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchDeleteBoard.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDeleteBoard.rejected, (state, action) => {
        state.loading = 'error';
        state.errorMessage = action.payload as string;
      });
  },
});

export const { toggleModalVisible, setIdDeletedBoard, setIdChangedBoard } = mainBoardSlice.actions;

export const mainBoardReducers = mainBoardSlice.reducer;
