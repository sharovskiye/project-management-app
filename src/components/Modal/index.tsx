import { PropsWithChildren } from 'react';
import Modal from '@mui/material/Modal/Modal';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ClassType, CustomButton } from '../designe/Buttons/CustomButton';

import styles from './styles.module.scss';

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
              classType={ClassType.cancel}
              onClick={props.handleClose}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
