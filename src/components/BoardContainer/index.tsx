import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { boardSelector, fetchUsers, setBoardId } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Board } from '../Board';

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const id = String(boardId);

  // const { is404 } = useAppSelector(boardSelector);

  dispatch(fetchUsers(''));
  dispatch(setBoardId(id));

  // useEffect(() => {
  //   if (is404) {
  //     return <Navigate to="*" />;
  //   }
  // }, [is404]);

  return <Board id={id} />;
};
