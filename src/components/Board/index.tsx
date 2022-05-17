import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  columnsSelector,
  fetchBoard,
  fetchCreateColumn,
  fetchCreateTask,
} from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mockBoardId, mockColumnId, mockUserId } from '../../store/mockFiles';
import { Column } from './Сolumn';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import styles from './styles.module.scss';
import { ClassType, CustomButton } from '../Design/Buttons/CustomButton';
import { useToggle } from '../../utils/CustomHook';
import { IColumn, ITask } from './interface';
import { ModalWindow } from '../Modal';

export const Board = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(columnsSelector);

  const { opened, onToggle } = useToggle();

  const columnsMemo = useMemo(() => {
    return columns
      ? columns.map((column) => (
          <div className={styles.boardColumnList} key={column.id}>
            <Column column={column} />
          </div>
        ))
      : null;
  }, [columns]);

  const mockNewTask: ITask = {
    title: `Test #${Date.now()}`,
    order: 2,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    userId: mockUserId,
    boardId: mockBoardId,
    columnId: mockColumnId,
  };
  // const { enqueueSnackbar } = useSnackbar();

  const [titleColumn, setTitleColumn] = useState('');

  const onChangeColumn = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleColumn(e.target.value);
  };

  const findMaxOrderColumn = () => {
    return columns ? columns.reduce((prev, { order }) => (prev > order ? prev : order), 0) : 0;
  };

  const onSubmitNewColumn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mockNewColumn: IColumn = {
      title: titleColumn,
      order: findMaxOrderColumn() + 1,
    };
    console.log({ titleColumn });
    dispatch(fetchCreateColumn(mockNewColumn));
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
      task
      <button
        onClick={() => {
          dispatch(fetchCreateTask(mockNewTask));
        }}
      >
        Click
      </button>
      {/* <button
        onClick={() => {
          enqueueSnackbar('lol', { variant: 'error' });
        }}
      >
        No click
      </button> */}
      <div className={styles.main}>
        {columnsMemo}
        <div className={styles.boardNewColumn}>
          <div className={styles.buttonWrapper}>
            <CustomButton
              typeof="button"
              textContent="Add new column"
              classType={ClassType.icon}
              icon={<AddCircleOutlineOutlinedIcon className={styles.iconAdd} />}
              onClick={onToggle}
            />
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

          {/* 
          <ModalInputTitle
            placeholder="Enter a title for the new columns"
            buttonName="Add column"
            open={opened}
            handleClose={onToggle}
          /> */}
        </div>
      </div>
    </div>
  );
};
