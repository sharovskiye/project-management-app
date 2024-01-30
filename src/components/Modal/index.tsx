import { PropsWithChildren } from 'react';
import Modal from '@mui/material/Modal/Modal';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import styles from './styles.module.scss';

export type ModalType = {
  open: boolean;
  handleClose: () => void;
};

export const ModalWindow = (props: PropsWithChildren<ModalType>) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <div className={styles.modal}>
        {props.children}
        <div className={styles.cancel}>
          <button onClick={props.handleClose} className={styles.btnCancel}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
