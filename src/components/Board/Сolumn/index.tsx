import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IColumn, INewTask } from '../interface';
import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ModalWindow } from '../../Modal';
import { mockUserId } from '../../../store/mockFiles';
import { fetchCreateTask } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hooks';
import { useChangeOpenModalBoard } from '../../../utils/CustomHook';

import styles from './styles.module.scss';

interface IColumnProps {
  boardId: string;
  column: IColumn;
}

export const Column = memo(({ boardId, column }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const { tasks } = column;
  const columnsMemo = useMemo(() => {
    return tasks
      ? tasks
          .map((task) => ({ ...task, boardId, columnId: column.id }))
          .sort((a, b) => a.order - b.order)
          .map((task) => <Task task={task} key={task.id} />)
      : null;
  }, [tasks, boardId, column.id]);

  const [height, setHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const { openModal, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      setHeight(refDiv.current.clientHeight);
    }
  }, [refDiv, column]);

  useEffect(() => {
    const heightColumnPercent = 0.62;
    const bodyHeight = window.innerHeight * heightColumnPercent;
    setIsScroll(bodyHeight < height);
  }, [height]);

  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescriptionTask(e.target.value);
  };

  const findMaxOrderTask = useCallback(() => {
    return tasks ? tasks.reduce((prev, { order }) => (prev > order ? prev : order), 0) : 0;
  }, [tasks]);

  const onSubmitNewTask = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newTask: INewTask = {
        title: titleTask,
        order: findMaxOrderTask() + 1,
        description: descriptionTask,
        userId: mockUserId,
        boardId,
        columnId: column.id,
      };
      dispatch(fetchCreateTask(newTask));
    },
    [boardId, column.id, descriptionTask, dispatch, findMaxOrderTask, titleTask]
  );

  const modal = useMemo(() => {
    return openModal ? (
      <ModalWindow open={openModal} handleClose={onCloseModal}>
        <form onSubmit={onSubmitNewTask}>
          <div>
            <label htmlFor="title">Title:</label>
            <input onChange={onChangeTitle} value={titleTask} type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              onChange={onChangeDescription}
              value={descriptionTask}
              type="text"
              id="description"
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </ModalWindow>
    ) : null;
  }, [descriptionTask, onSubmitNewTask, openModal, titleTask, onCloseModal]);

  return (
    <div className={styles.column}>
      <div className={styles.stickyHeader}>
        <ColumnHeader column={column} />
      </div>

      <div ref={refDiv} className={isScroll ? styles.taskListScroll : undefined}>
        <div>{columnsMemo}</div>
      </div>

      <div>
        <div className={styles.buttonWrapper}>
          <button onClick={onOpenModal} className={styles.btnAddTask}>
            <span>
              <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
            </span>
            Add task
          </button>
        </div>
        {modal}
      </div>
    </div>
  );
});
