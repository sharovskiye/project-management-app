import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Tooltip } from '@mui/material';
import { CustomButton } from '../../../Buttons';
import { useCallback, useState } from 'react';
import styles from '../styles.module.scss';
import { ConfirmModalWindow } from '../../../Modal/ConfirmModal';

export const ColumnHeader = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const isOpen = useCallback(() => {
    setOpen((prevValue) => !prevValue);
  }, []);

  const isOpenModal = useCallback(() => {
    setOpenModal((prevValue) => !prevValue);
  }, []);

  return (
    <>
      {!open && (
        <div className={`${styles.column_header}`}>
          <Tooltip title="Change title" placement="top">
            <div className={`${styles.column_title}`} onClick={isOpen}>
              <p>I`m title/ Click me</p>
            </div>
          </Tooltip>
          <Tooltip title="Delete column" placement="top">
            <div>
              <CustomButton
                icon={<ClearOutlinedIcon />}
                itemType="button"
                cancel={true}
                onClick={isOpenModal}
              />
            </div>
          </Tooltip>
          <ConfirmModalWindow open={openModal} handleClose={isOpenModal} />
        </div>
      )}
      {open && (
        <div className={`${styles.column_header}`}>
          <form className={styles.column_form}>
            <div className={styles.column_buttons}>
              <CustomButton icon={<CheckOutlinedIcon />} itemType="submit" submit={true} />
              <CustomButton
                icon={<ClearOutlinedIcon />}
                itemType="button"
                cancel={true}
                onClick={isOpen}
              />
            </div>
            <input className={styles.column_input} type="text" />
          </form>
        </div>
      )}
    </>
  );
};
