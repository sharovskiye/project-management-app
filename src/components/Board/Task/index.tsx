import { memo, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useToggle } from '../../../utils/CustomHook';
import { ITask } from '../interface';

import styles from './styles.module.scss';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';
import { ClassType, CustomButton } from '../../Design/Buttons/CustomButton';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { fetchDeleteTask } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hooks';

interface ITaskProps {
  task: ITask;
}

export const Task = memo(({ task }: ITaskProps) => {
  const dispatch = useAppDispatch();
  const { title, order } = task;

  const { opened: isOpenModal, onToggle: openModal } = useToggle();
  const { opened: isOpenConfirmModal, onToggle: openConfirmModal } = useToggle();

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isDelete) {
      dispatch(fetchDeleteTask(task));
    }
  }, [isDelete, dispatch, task]);

  const onDelete = () => {
    console.log(task);

    setIsDelete(true);
  };
  return (
    <div className={styles.task}>
      <div className={styles.taskTitle}>
        <p title={title}>
          Task #{order}: {title}
        </p>
        <div className={styles.taskButtons}>
          <CustomButton
            icon={<EditIcon />}
            itemType="button"
            classType={ClassType.submit}
            onClick={openModal}
          />

          <button onClick={openConfirmModal} className={styles.btnDelete}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
          {/* <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            classType={ClassType.cancel}
            onClick={openConfirmModal}
          /> */}
        </div>
      </div>
      <ModalInputTitle
        placeholder="This mod is to edit the task"
        buttonName="Edit"
        open={isOpenModal}
        handleClose={openModal}
      />
      <ConfirmModalWindow
        onDelete={onDelete}
        open={isOpenConfirmModal}
        handleClose={openConfirmModal}
      />
    </div>
  );
});
