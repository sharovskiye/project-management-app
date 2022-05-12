import { useCallback, useState } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Tooltip } from '@mui/material';
import { CustomButton } from '../../../Buttons/CustomButton';
import { ConfirmModalWindow } from '../../../../Modal/ConfirmModal';

import styles from '../styles.module.scss';

export const ColumnHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const open = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const openModal = useCallback(() => {
    setIsOpenModal((prevValue) => !prevValue);
  }, []);

  return (
    <>
      {!isOpen && (
        <div className={`${styles.column_header}`}>
          <Tooltip title="Change title" placement="top">
            <div className={`${styles.column_title}`} onClick={open}>
              <p>I`m title/ Click me</p>
            </div>
          </Tooltip>
          <Tooltip title="Delete column" placement="top">
            <div>
              <CustomButton
                icon={<ClearOutlinedIcon />}
                itemType="button"
                cancel
                onClick={openModal}
              />
            </div>
          </Tooltip>
          <ConfirmModalWindow open={isOpenModal} handleClose={openModal} />
        </div>
      )}
      {isOpen && (
        <div className={`${styles.column_header}`}>
          <form className={styles.column_form}>
            <div className={styles.column_buttons}>
              <CustomButton icon={<CheckOutlinedIcon />} itemType="submit" submit />
              <CustomButton icon={<ClearOutlinedIcon />} itemType="button" cancel onClick={open} />
            </div>
            <input className={styles.column_input} type="text" />
          </form>
        </div>
      )}
    </>
  );
};
