import { useCallback, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Column } from './Column';
import { CustomButton } from '../Buttons/CustomButton';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';

import styles from './styles.module.scss';

export const Board = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <div className={styles.boardColumnList}>
        <Column />
      </div>

      <div className={styles.boardNewColumn}>
        <div className={styles.buttonWrapper}>
          <CustomButton
            typeof="button"
            textContent="Add new column"
            icon={<AddCircleOutlineOutlinedIcon className={styles.icon__add} />}
            onClick={openModal}
          />
        </div>

        <ModalInputTitle
          placeholder="Enter a title for the new columns"
          buttonName="Add column"
          open={isOpenModal}
          handleClose={openModal}
        />
      </div>
    </>
  );
};
