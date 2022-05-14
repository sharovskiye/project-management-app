import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { WelcomePage } from '../pages/WelcomePage';
import { MainPage } from '../pages/MainPage';
import { Form } from '../Form';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getDataUserSelector } from '../../store/selectors';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';

import styles from './styles.module.scss';

export function App() {
  const { token } = useAppSelector(getDataUserSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const dataPerson = localStorage.getItem('personData');

    if (dataPerson) {
      const currentToken: { token: string } = JSON.parse(dataPerson);

      dispatch(getTokenWithLocalStorage(currentToken.token));
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={token ? <Navigate replace to="/main" /> : <WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}
