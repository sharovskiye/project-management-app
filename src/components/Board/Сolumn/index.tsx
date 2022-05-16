import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useToggle } from '../../../utils/CustomHook';
import { IColumn, ITask } from '../interface';
import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ClassType, CustomButton } from '../../Design/Buttons/CustomButton';

import styles from './styles.module.scss';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';
import { ModalWindow } from '../../Modal';
import { mockBoardId, mockColumnId, mockUserId } from '../../../store/mockFiles';
import { fetchCreateTask } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hooks';

interface IColumnProps {
  column: IColumn;
}

export const Column = memo(({ column }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const { title, tasks } = column;
  const columnsMemo = useMemo(() => {
    return tasks
      ? tasks
          .map((task) => ({ ...task, boardId: mockBoardId, columnId: mockColumnId }))
          .map((task) => <Task task={task} key={task.id} />)
      : null;
  }, [tasks]);
  console.log('render');

  const [height, setHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const { opened, onToggle } = useToggle();
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      setHeight(refDiv.current.clientHeight);
    }
  }, [refDiv, column]);

  useEffect(() => {
    const heightColumnPercent = 0.62;
    const bodyHeight = window.innerHeight * heightColumnPercent;
    console.log({ bodyHeight, height });

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

  const onSubmitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mockNewTask: ITask = {
      title: titleTask,
      order: 2,
      description: descriptionTask,
      userId: mockUserId,
      boardId: mockBoardId,
      columnId: mockColumnId,
    };
    console.log({ titleTask, descriptionTask });
    dispatch(fetchCreateTask(mockNewTask));
  };

  return (
    <div className={styles.column}>
      <div className={styles.stickyHeader}>
        <ColumnHeader column={column} />
      </div>

      <div ref={refDiv} className={isScroll ? `${styles.taskListScroll}` : `${styles.taskList}`}>
        <div>{columnsMemo}</div>
      </div>

      <div>
        <div className={styles.buttonWrapper}>
          <CustomButton
            typeof="button"
            textContent="Add task"
            classType={ClassType.icon}
            icon={<AddCircleOutlineOutlinedIcon className={styles.iconAdd} />}
            onClick={onToggle}
          />
        </div>
        <ModalWindow open={opened} handleClose={onToggle}>
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
        {/* <ModalInputTitle
          placeholder="Enter a title for this task"
          buttonName="Add task"
          open={opened}
          handleClose={onToggle}
        /> */}
      </div>
    </div>
  );
});
