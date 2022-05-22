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
  const { title } = column;
  const [newTitle, setNewTitle] = useState(title);

  const onChangeTitleColumn = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTitle(value);
  };

  const onClickSubmit = () => {
    if (title !== newTitle) {
      dispatch(fetchUpdateColumn({ ...column, title: newTitle }));
    }
    openTitleEdit();
  };

  return (
    <div className={styles.titleColumn}>
      <div className={styles.buttons}>
        <button
          disabled={!newTitle.trim()}
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
