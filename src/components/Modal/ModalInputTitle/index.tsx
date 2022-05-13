import { ModalWindow } from '..';
import { ClassType, CustomButton } from '../../designe/Buttons/CustomButton';

import styles from './styles.module.scss';

export type ModalType = {
  placeholder: string;
  buttonName: string;
  open: boolean;
  handleClose: () => void;
};

export const ModalInputTitle = ({ placeholder, buttonName, open, handleClose }: ModalType) => {
  return (
    <ModalWindow open={open} handleClose={handleClose}>
      <div className={styles.modal}>
        <textarea className={styles.input} placeholder={placeholder}></textarea>
        <div className={styles.button}>
          <CustomButton itemType="button" classType={ClassType.submit} textContent={buttonName} />
        </div>
      </div>
    </ModalWindow>
  );
};
