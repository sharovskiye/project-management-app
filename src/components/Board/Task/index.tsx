import { memo, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useToggle } from '../../../utils/CustomHook';
import { ITask } from '../interface';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { fetchDeleteTask } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hook';

import styles from './styles.module.scss';
interface ITaskProps {
  task: ITask;
}

export const Task = memo(({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { title, order } = task;

  const { opened: isOpenConfirmModal, onToggle: openConfirmModal } = useToggle();

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete) {
      dispatch(fetchDeleteTask(task));
    }
  }, [isDelete, dispatch, task]);

  const onDelete = () => {
    setIsDelete(true);
  };
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
          <button onClick={openConfirmModal} className={`${styles.btn} ${styles.btnDelete}`}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
        </div>
      </div>
      <ConfirmModalWindow
        onDelete={onDelete}
        open={isOpenConfirmModal}
        handleClose={openConfirmModal}
      />
    </div>
  );
});
