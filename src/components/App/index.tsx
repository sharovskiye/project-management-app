import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WelcomePage } from '../pages/WelcomePage';
import { MainPage } from '../pages/MainPage';
import { Form } from '../Form';
import { useAppDispatch } from '../../store/hook';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';
import { RequireAuth } from '../../hoc/RequireAuth';
import { AccessToPages } from '../../hoc/AccessToPages';

import styles from './styles.module.scss';

export function App() {
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
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/main"
          element={
            <AccessToPages>
              <MainPage />
            </AccessToPages>
          }
        />
        <Route
          path="/form"
          element={
            <RequireAuth>
              <Form />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
