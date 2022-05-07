import { Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { CustomButton } from '../Buttons/CustomButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import style from '../style.module.scss';
import { ModalWindow } from './ModalWindow';

export const Column = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const isOpen = useCallback(() => {
    setOpen((prevValue) => !prevValue);
  }, []);

  return (
    <div className={`${style.column}`}>
      {!open && (
        <div className={`${style.column_header}`}>
          <Tooltip title="Change title" placement="top">
            <div className={`${style.column_title}`} onClick={isOpen}>
              <p>I`m title/ Click me</p>
            </div>
          </Tooltip>
          <Tooltip title="Delete column" placement="top">
            <div>
              <CustomButton
                icon={<ClearOutlinedIcon />}
                itemType="button"
                className={`${style.columnButton} ${style.columnButton__cancel}`}
                onClick={isOpen}
              />
            </div>
          </Tooltip>
        </div>
      )}
      {open && (
        <div className={`${style.column_header}`}>
          <form className={style.column_form}>
            <div className={style.column_buttons}>
              <CustomButton
                icon={<CheckOutlinedIcon />}
                itemType="submit"
                className={`${style.columnButton} ${style.columnButton__submit}`}
              />
              <CustomButton
                icon={<ClearOutlinedIcon />}
                itemType="button"
                className={`${style.columnButton} ${style.columnButton__cancel}`}
                onClick={isOpen}
              />
            </div>
            <input className={style.column_input} type="text" />
          </form>
        </div>
      )}

      <CustomButton
        typeof="button"
        textContent="Add task"
        className={`${style.columnButton} ${style.columnButton__icon}`}
        style={{ height: '37px' }}
        icon={<AddCircleOutlineOutlinedIcon className={style.icon__add} />}
        onClick={handleOpen}
      />

      <ModalWindow
        open={openModal}
        handleClose={handleClose}
        placeHolder="Enter a title for this task"
        nameButton="Add task"
      />
    </div>
  );
};
