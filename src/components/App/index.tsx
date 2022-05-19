import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { WelcomePage } from '../pages/WelcomePage';
import { MainPage } from '../pages/MainPage';
import { Form } from '../Form';
import { useAppDispatch } from '../../store/hook';
import { getTokenWithLocalStorage, getUserData, setLogin } from '../../store/signInUpSlice';
import { RequireAuth } from '../../hoc/RequireAuth';
import { AccessToPages } from '../../hoc/AccessToPages';

import styles from './styles.module.scss';
import { Layout } from '../Layout';

import { Board } from '../Board';
import { BoardContainer } from '../BoardContainer';

interface ILocalStorage {
  token: string;
  login: string;
}

export function App() {
  const dispatch = useAppDispatch();

  const dataPerson = localStorage.getItem('personData');

  if (dataPerson) {
    const currentToken: ILocalStorage = JSON.parse(dataPerson);

    dispatch(getTokenWithLocalStorage(currentToken.token));
    dispatch(setLogin(currentToken.login));
  }

  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <WelcomePage />
              </RequireAuth>
            }
          />
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
          {/* test: /boards/1b481050-6177-4f95-b814-b232837a0726 */}
          <Route
            path="/boards/:boardId"
            element={
              <AccessToPages>
                <BoardContainer />
              </AccessToPages>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

{
  /* <Board /> */
}
