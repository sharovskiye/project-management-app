import React, { useState } from 'react';
import { CustomButton } from '../Buttons/CustomButton';
import style from '../style.module.scss';
import { Column } from '../Board/Column';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ModalWindow } from '../Board/ModalWindow';

export const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div className={`${style.container} ${style.container__medium}  ${style.main}`}>
      <Column />
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginLeft: '80px',
          width: '350px',
        }}
      >
        BUTTONS
        <CustomButton
          typeof="button"
          textContent="Add new column"
          className={`${style.columnButton} ${style.columnButton__icon}`}
          style={{ height: '37px' }}
          icon={<AddCircleOutlineOutlinedIcon className={style.icon__add} />}
          onClick={handleOpen}
        />
        <ModalWindow
          open={openModal}
          handleClose={handleClose}
          placeHolder="Enter a title for the new
        columns"
          nameButton="Add column"
        />
      </div>
    </div>
  );
};
