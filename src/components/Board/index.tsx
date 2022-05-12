import { fetchBoard } from '../../store/boardSlice';
import { useAppDispatch } from '../../store/hooks';
import { mockBoardId } from '../../store/mockFiles';
import { Column } from './Сolumn';

export const Board = () => {
  const dispatch = useAppDispatch();
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
      <div>
        <Column />
      </div>
    </div>
  );
};
