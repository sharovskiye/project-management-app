import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hook';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { Header } from '../../Header';
import { Main } from '../../Design/Main';

export const MainPage = () => {
  return (
    <div>
      <Main />
    </div>
  );
};
