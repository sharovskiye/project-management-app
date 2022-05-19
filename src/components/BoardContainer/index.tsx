import { useParams } from 'react-router-dom';
import { setBoardId } from '../../store/boardSlice';
import { useAppDispatch } from '../../store/hooks';
import { Board } from '../Board';

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const id = String(boardId);

  dispatch(setBoardId(id));

  return <Board id={id} />;
};
