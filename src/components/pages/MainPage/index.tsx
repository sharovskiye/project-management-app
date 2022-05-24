import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';
import { setAuthorized } from '../../../store/boardSlice';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';

export const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    localStorage.clear();
    dispatch(setAuthorized(false));
    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div>
      <h1>Main page</h1>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
