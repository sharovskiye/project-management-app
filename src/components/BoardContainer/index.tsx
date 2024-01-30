import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { boardSelector, setBoardId, setIs404 } from '../../store/boardSlice';
import { fetchUsers } from '../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Board } from '../Board';

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const id = String(boardId);

  const navigate = useNavigate();

  const { is404 } = useAppSelector(boardSelector);

  useEffect(() => {
    dispatch(fetchUsers(''));
    dispatch(setBoardId(id));
    dispatch(setIs404(false));

    if (is404) {
      navigate('*');
    }
  }, [is404, dispatch, navigate, id]);

  return <Board id={id} />;
};
