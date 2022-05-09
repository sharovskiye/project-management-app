import styles from './styles.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { ModalWindow } from '../../Modal';
import { useState } from 'react';
import { CustomButton } from '../../Buttons';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';

export const TaskCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleOpenConfirm = () => setOpenConfirmModal(true);
  const handleCloseConfirm = () => setOpenConfirmModal(false);

  return (
    <div className={styles.task}>
      <div className={styles.task_title}>
        <p>I`m task title</p>
        <div className={`${styles.column_buttons} ${styles.task_buttons}`}>
          <CustomButton icon={<EditIcon />} itemType="button" submit={true} onClick={handleOpen} />
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            cancel={true}
            onClick={handleOpenConfirm}
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
        handleClose={handleClose}
        nameButton="Edit"
      />
      <ConfirmModalWindow open={openConfirmModal} handleClose={handleCloseConfirm} />
    </div>
  );
};
