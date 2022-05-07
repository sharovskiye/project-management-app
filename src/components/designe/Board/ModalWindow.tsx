import Modal from '@mui/material/Modal/Modal';
import style from '../style.module.scss';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../Buttons/CustomButton';

export type ModalType = {
  open: boolean;
  handleClose: () => void;
  placeHolder: string;
  nameButton: string;
};

export const ModalWindow = ({ open, handleClose, placeHolder, nameButton }: ModalType) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <form className={style.modal_form}>
        <input className={style.modal_input} type="text" placeholder={placeHolder} />
        <div className={style.modal_buttons}>
          <CustomButton
            itemType="button"
            className={`${style.columnButton} ${style.columnButton__submit} ${style.modal_textButton}`}
            textContent={nameButton}
          />
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            className={`${style.columnButton} ${style.columnButton__cancel}`}
            onClick={handleClose}
          />
        </div>
      </form>
    </Modal>
  );
};
