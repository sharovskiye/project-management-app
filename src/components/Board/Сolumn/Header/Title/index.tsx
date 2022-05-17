import { Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ClassType, CustomButton } from '../../../../Design/Buttons/CustomButton';
import { ConfirmModalWindow } from '../../../../Modal/ConfirmModal';

import styles from './styles.module.scss';
import { useAppDispatch } from '../../../../../store/hooks';
import { fetchDeleteColumn } from '../../../../../store/boardSlice';
import { IColumn } from '../../../interface';
import { useToggle } from '../../../../../utils/CustomHook';
import { useEffect, useState } from 'react';

interface IColumnTitleProps {
  openTitleEdit: () => void;
  column: IColumn;
}

export const Title = ({ openTitleEdit, column }: IColumnTitleProps) => {
  const dispatch = useAppDispatch();

  const [isDelete, setIsDelete] = useState(false);

  const { opened: isOpenModal, onToggle: openModal } = useToggle();

  useEffect(() => {
    if (isDelete) {
      dispatch(fetchDeleteColumn(column));
    }
  }, [isDelete, dispatch, column]);

  const onDelete = () => {
    console.log(column);
    setIsDelete(true);
  };
  return (
    <>
      <Tooltip title="Change title" placement="top">
        <div className={`${styles.title}`} onClick={openTitleEdit}>
          <p>{column.title}</p>
        </div>
      </Tooltip>
      <Tooltip title="Delete column" placement="top">
        <div>
          <button onClick={openModal} className={styles.btnDelete}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
          {/* <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            classType={ClassType.cancel}
            onClick={openModal}
          /> */}
        </div>
      </Tooltip>
      <ConfirmModalWindow onDelete={onDelete} open={isOpenModal} handleClose={openModal} />
    </>
  );
};
