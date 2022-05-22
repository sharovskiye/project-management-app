import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthorized } from '../../../store/boardSlice';
import { useAppDispatch } from '../../../store/hooks';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { BoardContainer } from '../../BoardContainer';
import { Header } from '../../Design/Header';
import { Main } from '../../Design/Main';

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
      <Main />
    </div>
  );
};
