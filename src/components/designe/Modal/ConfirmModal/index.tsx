import Modal from '@mui/material/Modal/Modal';
import styles from '../styles.module.scss';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../../Buttons';

export type ConfirmModalType = {
  open: boolean;
  handleClose: () => void;
};

export const ConfirmModalWindow = ({ open, handleClose }: ConfirmModalType) => {
  return (
    <Modal open={open} onClose={handleClose} hideBackdrop>
      <form className={styles.modal_form}>
        <div className={styles.modal_textContent}>
          Confirm item deletion. Cancellation is not possible.
        </div>
        <div className={styles.modal_buttons}>
          <CustomButton
            itemType="button"
            submit={true}
            textContent="Delete"
            onClick={() => {
              console.log('Написать функцию удаления элемента');
            }}
          />
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            cancel={true}
            onClick={handleClose}
          />
        </div>
      </form>
    </Modal>
  );
};
