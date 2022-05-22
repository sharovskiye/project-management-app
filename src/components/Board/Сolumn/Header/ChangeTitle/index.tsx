import { ChangeEvent, useState } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { fetchUpdateColumn } from '../../../../../store/boardSlice';
import { useAppDispatch } from '../../../../../store/hooks';
import { IColumn } from '../../../interface';

import styles from './styles.module.scss';

interface IChangeTitleProps {
  openTitleEdit: () => void;
  column: IColumn;
}

export const ChangeTitle = ({ openTitleEdit, column }: IChangeTitleProps) => {
  const dispatch = useAppDispatch();
  const { id, title, order } = column;
  const [newTitle, setNewTitle] = useState(title);
  const [disabled, setDisabled] = useState(false);

  const onChangeTitleColumn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTitle(value);
    setDisabled(!value.trim());
  };

  const onClickSubmit = () => {
    if (title !== newTitle) {
      dispatch(fetchUpdateColumn({ id, title: newTitle, order }));
    }
    openTitleEdit();
  };

  return (
    <div className={styles.titleColumn}>
      <div className={styles.buttons}>
        <button
          disabled={disabled}
          onClick={onClickSubmit}
          className={`${styles.btn} ${styles.btnSubmit}`}
        >
          <span>
            <CheckOutlinedIcon />
          </span>
        </button>
        <button onClick={openTitleEdit} className={`${styles.btn} ${styles.btnCancel}`}>
          <span>
            <ClearOutlinedIcon />
          </span>
        </button>
      </div>
      <input onChange={onChangeTitleColumn} className={styles.input} type="text" value={newTitle} />
    </div>
  );
};
