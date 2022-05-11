import styles from './styles.module.scss';
import { Column } from './Column';
import React, { useState } from 'react';
import { CustomButton } from '../Buttons';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ModalWindow } from '../Modal';

export const Board = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div className={styles.board_columnList}>
        <Column />
      </div>

      <div className={styles.board_newColumn}>
        <CustomButton
          typeof="button"
          textContent="Add new column"
          style={{ height: '37px' }}
          icon={<AddCircleOutlineOutlinedIcon className={styles.icon__add} />}
          onClick={handleOpen}
        />
        <ModalWindow open={openModal} handleClose={handleClose}>
          <div className={styles.modal}>
            <textarea
              className={styles.input}
              placeholder="Enter a title for the new columns"
            ></textarea>
            <div className={styles.button}>
              <CustomButton itemType="button" submit={true} textContent="Add column" />
            </div>
          </div>
        </ModalWindow>
      </div>
    </>
  );
};
