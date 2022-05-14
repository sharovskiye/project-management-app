import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hook';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { Footer } from '../../Footer';

export const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div>
      <h1>Main page</h1>
      <button onClick={() => logOut()}>LogOut</button>
      <Footer />
    </div>
  );
};
