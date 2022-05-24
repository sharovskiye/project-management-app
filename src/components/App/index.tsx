import { Route, Routes } from 'react-router-dom';
import { WelcomePage } from '../pages/WelcomePage';
import { MainPage } from '../pages/MainPage';
import { Form } from '../Form';
import { useAppDispatch } from '../../store/hooks';
import { getTokenWithLocalStorage, setLogin } from '../../store/signInUpSlice';
import { RequireAuth } from '../../hoc/RequireAuth';
import { AccessToPages } from '../../hoc/AccessToPages';
import { Layout } from '../Layout';
import { BoardContainer } from '../BoardContainer';
import { setAuthorized } from '../../store/boardSlice';
import { EditProfileForm } from '../Form/EditProfileForm';

import styles from './styles.module.scss';

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
    dispatch(setAuthorized(true));
  }

  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          {/* test: /boards/6d755762-8c91-4aef-bc25-9b2486691a72 */}
          <Route
            path="/boards/:boardId"
            element={
              <AccessToPages>
                <BoardContainer />
              </AccessToPages>
            }
          />
          <Route
            path="/profile"
            element={
              <AccessToPages>
                <EditProfileForm />
              </AccessToPages>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
