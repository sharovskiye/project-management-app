import Modal from '@mui/material/Modal/Modal';
import { ClassType, CustomButton } from '../../Design/Buttons/CustomButton';

import styles from './styles.module.scss';

export type ConfirmModalType = {
  open: boolean;
  handleClose: () => void;
};

export const ConfirmModalWindow = ({ open, handleClose }: ConfirmModalType) => {
  return (
    <Modal open={open}>
      <form className={`${styles.modal_form}`}>
        <div className={styles.modal_title}>
          <div className={styles.modal_textContent}>Confirm deletion.</div>
        </div>

        <div className={styles.modal_textContent}>Cancellation is not possible.</div>
        <div className={styles.modal_buttons}>
          <CustomButton
            itemType="button"
            className={`${styles.modal_buttonDelete}`}
            textContent="Delete"
          />
          <CustomButton
            itemType="button"
            classType={ClassType.cancel}
            textContent="Cancel"
            onClick={handleClose}
          />
        </div>
      </form>
    </Modal>
  );
};
