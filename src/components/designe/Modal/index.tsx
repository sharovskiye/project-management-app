import Modal from '@mui/material/Modal/Modal';
import styles from './styles.module.scss';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../Buttons';
import { ReactNode } from 'react';

export type ModalType = {
  open: boolean;
  handleClose: () => void;
  nameButton: string;
  child?: ReactNode;
};

export const ModalWindow = ({ open, handleClose, nameButton, child }: ModalType) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <form className={styles.modal_form}>
        {child && <div className={styles.modal_input}>{child}</div>}
        {/* {children && children.map((child, index: number) => <div key={index}>{child}</div>)} */}
        <div className={styles.modal_buttons}>
          <CustomButton itemType="button" submit={true} textContent={nameButton} />
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
