import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../../Buttons/CustomButton';
// import { ConfirmModalWindow } from '../../../Modal/ConfirmModal';
import { ModalInputTitle } from '../../../Modal/ModalInputTitle';
import { ClassType } from '../../Buttons/CustomButton';
import { useToggle } from '../../../../utils/CustomHook';

import styles from './styles.module.scss';

export const TaskCard = () => {
  const { opened: isOpenModal, onToggle: openModal } = useToggle();
  // const { opened: isOpenConfirmModal, onToggle: openConfirmModal } = useToggle();

  return (
    <div className={styles.task}>
      <div className={styles.taskTitle}>
        <p>I`m task title</p>
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
            onClick={() => {}}
          />
        </div>
      </div>
      <ModalInputTitle
        placeholder="This mod is to edit the task"
        buttonName="Edit"
        open={isOpenModal}
        handleClose={openModal}
      />
      {/* <ConfirmModalWindow open={isOpenConfirmModal} handleClose={openConfirmModal} /> */}
    </div>
  );
};
