import { memo, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useToggle } from '../../../utils/CustomHook';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { fetchDeleteTask } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hooks';
import { ITask } from '../interface';

import styles from './styles.module.scss';

interface ITaskProps {
  task: ITask;
}

export const Task = memo(({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { title, order } = task;
  const { opened, onToggle } = useToggle();

  const onDelete = useCallback(() => {
    dispatch(fetchDeleteTask(task));
  }, [dispatch, task]);

  return (
    <div className={styles.task}>
      <div className={styles.taskTitle}>
        <p title={title}>
          Task #{order}: {title}
        </p>
        <div className={styles.taskButtons}>
          <button className={`${styles.btn} ${styles.btnEdit}`}>
            <span>
              <EditIcon />
            </span>
          </button>
          <button onClick={onToggle} className={`${styles.btn} ${styles.btnDelete}`}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
        </div>
      </div>
      <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
    </div>
  );
});
