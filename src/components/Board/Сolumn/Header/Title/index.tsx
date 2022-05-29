import { useCallback } from 'react';
import { Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useTranslation } from 'react-i18next';

import { ConfirmModalWindow } from '../../../../Modal/ConfirmModal';
import { useAppDispatch } from '../../../../../store/hooks';
import { fetchDeleteColumn } from '../../../../../store/boardSlice';
import { useToggle } from '../../../../../utils/CustomHook';
import { IColumn } from '../../../interface';

import styles from './styles.module.scss';

interface IColumnTitleProps {
  openTitleEdit: () => void;
  column: IColumn;
}

export const Title = ({ openTitleEdit, column }: IColumnTitleProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { opened, onToggle } = useToggle();

  const onDelete = useCallback(() => {
    dispatch(fetchDeleteColumn(column));
  }, [dispatch, column]);

  return (
    <>
      <Tooltip title={t('board.Change title')} placement="top">
        <div className={`${styles.title}`} onClick={openTitleEdit}>
          <p title={column.title}>{column.title}</p>
        </div>
      </Tooltip>
      <Tooltip title={t('board.Delete column')} placement="top">
        <div>
          <button onClick={onToggle} className={styles.btnDelete}>
            <span>
              <ClearOutlinedIcon />
            </span>
          </button>
        </div>
      </Tooltip>
      <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
    </>
  );
};
