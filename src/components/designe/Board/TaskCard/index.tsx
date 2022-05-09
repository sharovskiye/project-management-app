import styles from './styles.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { ModalWindow } from '../../Modal';
import { useCallback, useState } from 'react';
import { CustomButton } from '../../Buttons';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';

export const TaskCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const isOpenModal = useCallback(() => {
    setOpenModal((prevValue) => !prevValue);
  }, []);

  const isOpenConfirmModal = useCallback(() => {
    setOpenConfirmModal((prevValue) => !prevValue);
  }, []);

  return (
    <div className={styles.task}>
      <div className={styles.task_title}>
        <p>I`m task title</p>
        <div className={`${styles.column_buttons} ${styles.task_buttons}`}>
          <CustomButton icon={<EditIcon />} itemType="button" submit={true} onClick={isOpenModal} />
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            cancel={true}
            onClick={isOpenConfirmModal}
          />
        </div>
      </div>
      <ModalWindow
        child={
          <textarea
            className={styles.modal_input}
            placeholder="This mod is to edit the task"
            style={{ height: '100%', width: '100%' }}
          ></textarea>
        }
        open={openModal}
        handleClose={isOpenModal}
        nameButton="Edit"
      />
      <ConfirmModalWindow open={openConfirmModal} handleClose={isOpenConfirmModal} />
    </div>
  );
};
