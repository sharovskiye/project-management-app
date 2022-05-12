import { useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../../Buttons/CustomButton';
import { ConfirmModalWindow } from '../../../Modal/ConfirmModal';
import { ModalInputTitle } from '../../../Modal/ModalInputTitle';

import styles from './styles.module.scss';

export const TaskCard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmModal, setisOpenConfirmModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal((prevValue) => !prevValue);
  }, []);

  const openConfirmModal = useCallback(() => {
    setisOpenConfirmModal((prevValue) => !prevValue);
  }, []);

  return (
    <div className={styles.task}>
      <div className={styles.task_title}>
        <p>I`m task title</p>
        <div className={`${styles.column_buttons} ${styles.task_buttons}`}>
          <CustomButton icon={<EditIcon />} itemType="button" submit onClick={openModal} />
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            cancel
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
};
