import { useCallback, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';
import { useToggle } from '../../utils/CustomHook';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './styles.module.scss';

export const Layout = () => {
  const location = useLocation();
  const { opened: isCheckedTheme, onToggle: checkedTheme } = useToggle();

  /* const theme = isCheckedTheme ? styles.lightTheme : styles.darkTheme; */

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={styles.wrapper}>
      <header>
        {location.pathname === '/main' && <Header theme={''} signOut={logOut} userName="Hello" />}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className={styles.footerWrapper}>
        <Footer theme={'isCheckedTheme ? styles.darkTheme : styles.lightTheme'} />
      </footer>
    </div>
  );
};
