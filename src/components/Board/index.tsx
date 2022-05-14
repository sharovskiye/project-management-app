import { useMemo } from 'react';
import { columnsSelector, fetchBoard } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mockBoardId } from '../../store/mockFiles';
import { Column } from './Сolumn';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import styles from './styles.module.scss';
import { ModalInputTitle } from '../Modal/ModalInputTitle';
import { ClassType, CustomButton } from '../Design/Buttons/CustomButton';
import { useToggle } from '../../utils/CustomHook';

export const Board = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(columnsSelector);

  const { opened, onToggle } = useToggle();

  const columnsMemo = useMemo(() => {
    return columns
      ? columns.map((column) => (
          <div className={styles.boardColumnList} key={column.id}>
            <Column column={column} />
          </div>
        ))
      : null;
  }, [columns]);

  return (
    <div className={`${styles.container} ${styles.containerMedium} `}>
      Board
      <button
        onClick={() => {
          dispatch(fetchBoard(mockBoardId));
        }}
      >
        Click
      </button>
      <button
        onClick={() => {
          dispatch(fetchBoard(mockBoardId + '1'));
        }}
      >
        No click
      </button>
      <div className={styles.main}>
        {columnsMemo}
        <div className={styles.boardNewColumn}>
          <div className={styles.buttonWrapper}>
            <CustomButton
              typeof="button"
              textContent="Add new column"
              classType={ClassType.icon}
              icon={<AddCircleOutlineOutlinedIcon className={styles.iconAdd} />}
              onClick={onToggle}
            />
          </div>

          <ModalInputTitle
            placeholder="Enter a title for the new columns"
            buttonName="Add column"
            open={opened}
            handleClose={onToggle}
          />
        </div>
      </div>
    </div>
  );
};
