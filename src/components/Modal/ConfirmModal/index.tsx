import Modal from '@mui/material/Modal/Modal';

import styles from './styles.module.scss';

export type ConfirmModalType = {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
};

export const ConfirmModalWindow = ({ open, handleClose, onDelete }: ConfirmModalType) => {
  const onClickBtnDelete = () => {
    onDelete();
    handleClose();
  };
  return (
    <Modal open={open}>
      <div className={`${styles.modal}`}>
        <div className={styles.title}>
          <div className={styles.textContent}>Confirm deletion.</div>
        </div>
        <div className={styles.textContent}>Cancellation is not possible.</div>

        <div className={styles.buttons}>
          <button onClick={onClickBtnDelete} className={`${styles.btn} ${styles.btnDelete}`}>
            Delete
          </button>
          <button onClick={handleClose} className={`${styles.btn} ${styles.btnCancel}`}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
