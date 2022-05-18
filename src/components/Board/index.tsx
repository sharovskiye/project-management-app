import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  columnsSelector,
  fetchBoard,
  fetchCreateColumn,
  isLoadingOnBoardSelector,
} from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { mockBoardId } from '../../store/mockFiles';
import { Column } from './Сolumn';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useToggle } from '../../utils/CustomHook';
import { INewColumn } from './interface';
import { ModalWindow } from '../Modal';
import { Spinner } from '../Spinner';

import styles from './styles.module.scss';

export const Board = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(columnsSelector);
  const loading = useAppSelector(isLoadingOnBoardSelector);

  const { opened, onToggle } = useToggle();

  useEffect(() => {
    dispatch(fetchBoard(mockBoardId));
  }, [dispatch]);

  const columnsMemo = useMemo(() => {
    return columns
      ? columns.map((column) => (
          <div className={styles.boardColumnList} key={column.id}>
            <Column boardId={mockBoardId} column={column} />
          </div>
        ))
      : null;
  }, [columns]);

  const [titleColumn, setTitleColumn] = useState('');

  const onChangeColumn = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleColumn(e.target.value);
  };

  const findMaxOrderColumn = () => {
    return columns ? columns.reduce((prev, { order }) => (prev > order ? prev : order), 0) : 0;
  };

  const onSubmitNewColumn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newColumn: INewColumn = {
      title: titleColumn,
      order: findMaxOrderColumn() + 1,
      boardId: mockBoardId,
    };
    dispatch(fetchCreateColumn(newColumn));
  };

  return (
    <div className={`${styles.container} ${styles.containerMedium} `}>
      Board
      <button
        onClick={() => {
          dispatch(fetchBoard(mockBoardId));
        }}
      >
        Click
      </button>
      <button
        onClick={() => {
          dispatch(fetchBoard(mockBoardId + '1'));
        }}
      >
        No click
      </button>
      {loading && <Spinner />}
      <div className={styles.main}>
        {columnsMemo}
        <div className={styles.boardNewColumn}>
          <div className={styles.buttonWrapper}>
            <button onClick={onToggle} className={styles.btnAddColumn}>
              <span>
                <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
              </span>
              Add new column
            </button>
          </div>

          <ModalWindow open={opened} handleClose={onToggle}>
            <form onSubmit={onSubmitNewColumn}>
              <div>
                <label htmlFor="title">Title:</label>
                <input onChange={onChangeColumn} value={titleColumn} type="text" id="title" />
              </div>

              <button type="submit">submit</button>
            </form>
          </ModalWindow>
        </div>
      </div>
    </div>
  );
};
