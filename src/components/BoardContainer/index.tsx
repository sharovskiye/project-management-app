import { useParams } from 'react-router-dom';
import { fetchUsers, setBoardId } from '../../store/boardSlice';
import { useAppDispatch } from '../../store/hooks';
import { Board } from '../Board';

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const id = String(boardId);

  dispatch(setBoardId(id));
  dispatch(fetchUsers(''));

  return <Board id={id} />;
};
