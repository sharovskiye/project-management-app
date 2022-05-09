import Modal from '@mui/material/Modal/Modal';
import styles from '../styles.module.scss';
import { CustomButton } from '../../Buttons';

export type ConfirmModalType = {
  open: boolean;
  handleClose: () => void;
};

export const ConfirmModalWindow = ({ open, handleClose }: ConfirmModalType) => {
  return (
    <Modal open={open}>
      <form className={`${styles.modal_form}`}>
        <div className={styles.modal_title}>
          <div className={styles.modal_textContent}>Confirm item deletion.</div>
        </div>

        <div className={styles.modal_textContent}>Cancellation is not possible.</div>
        <div className={styles.modal_buttons}>
          <CustomButton
            itemType="button"
            className={`${styles.modal_buttonDelete}`}
            textContent="Delete"
          />
          <CustomButton
            /* icon={<ClearOutlinedIcon />} */ itemType="button"
            textContent="Cancel"
            onClick={handleClose}
          />
        </div>
      </form>
    </Modal>
  );
};
