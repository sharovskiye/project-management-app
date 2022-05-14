import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useToggle } from '../../../utils/CustomHook';
import { ITask } from '../interface';

import styles from './styles.module.scss';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';
import { ClassType, CustomButton } from '../../Design/Buttons/CustomButton';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';

interface ITaskProps {
  task: ITask;
}

export const Task = memo(({ task }: ITaskProps) => {
  const { title, order } = task;

  const { opened: isOpenModal, onToggle: openModal } = useToggle();
  const { opened: isOpenConfirmModal, onToggle: openConfirmModal } = useToggle();

  return (
    <div className={styles.task}>
      <div className={styles.taskTitle}>
        <p>
          Task #{order}: {title}
        </p>
        <div className={styles.taskButtons}>
          <CustomButton
            icon={<EditIcon />}
            itemType="button"
            classType={ClassType.submit}
            onClick={openModal}
          />

          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            classType={ClassType.cancel}
            onClick={openConfirmModal}
          />
        </div>
      </div>
      <ModalInputTitle
        placeholder="This mod is to edit the task"
        buttonName="Edit"
        open={isOpenModal}
        handleClose={openModal}
      />
      <ConfirmModalWindow open={isOpenConfirmModal} handleClose={openConfirmModal} />
    </div>
  );
});
