import { useMemo } from 'react';
import { columnsSelector, fetchBoard } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mockBoardId } from '../../store/mockFiles';
import { Column } from './Сolumn';

export const Board = () => {
  const dispatch = useAppDispatch();

  const columns = useAppSelector(columnsSelector);

  const columnsMemo = useMemo(() => {
    return columns ? columns.map((column) => <Column column={column} key={column.id} />) : null;
  }, [columns]);

  return (
    <div>
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
      <div>{columnsMemo}</div>
    </div>
  );
};
