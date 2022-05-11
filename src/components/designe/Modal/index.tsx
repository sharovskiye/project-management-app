import Modal from '@mui/material/Modal/Modal';
import styles from './styles.module.scss';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../Buttons';
import { PropsWithChildren } from 'react';

export type ModalType = {
  open: boolean;
  handleClose: () => void;
};

export const ModalWindow = (props: PropsWithChildren<ModalType>) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <form className={styles.modal_form}>
        <div className={styles.modal}>
          {props.children}
          <div className={styles.cancel}>
            <CustomButton
              icon={<ClearOutlinedIcon />}
              itemType="button"
              cancel={true}
              onClick={props.handleClose}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
