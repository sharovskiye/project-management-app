import { useCallback, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDataUserSelector } from '../../store/selectors';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './styles.module.scss';

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(getDataUserSelector);
  const refHeader = useRef<HTMLDivElement>(null);
  const stickyHeader = token ? styles.stickyHeader : '';

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;

    if (refHeader.current && token) {
      const headerHeight = 100;
      scrollTop >= headerHeight
        ? refHeader.current.classList.add(styles.scroll)
        : refHeader.current.classList.remove(styles.scroll);
    }
  };

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={styles.wrapper}>
      <header ref={refHeader} className={stickyHeader}>
        {location.pathname === '/main' && <Header signOut={logOut} userName="Hello" />}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className={styles.footerWrapper}>
        <Footer />
      </footer>
    </div>
  );
};
