import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ChangeEvent, useState } from 'react';
import { fetchUpdateColumn } from '../../../../../store/boardSlice';
import { useAppDispatch } from '../../../../../store/hook';
import { ClassType, CustomButton } from '../../../../Design/Buttons/CustomButton';
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

  const onChangeTitleColumn = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onClickSubmit = () => {
    if (title !== newTitle) {
      dispatch(fetchUpdateColumn({ id, title: newTitle, order }));
      openTitleEdit();
    }
  };

  return (
    <div className={styles.titleColumn}>
      <div className={styles.buttons}>
        {/* <CustomButton icon={<CheckOutlinedIcon />} itemType="submit" classType={ClassType.submit} /> */}
        <button onClick={onClickSubmit} className={styles.btnSubmit}>
          <span>
            <CheckOutlinedIcon />
          </span>
        </button>
        <CustomButton
          icon={<ClearOutlinedIcon />}
          itemType="button"
          classType={ClassType.cancel}
          onClick={openTitleEdit}
        />
      </div>
      <input onChange={onChangeTitleColumn} className={styles.input} type="text" value={newTitle} />
    </div>
  );
};
