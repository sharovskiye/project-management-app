import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getDataUserSelector } from '../../store/selectors';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeaderWelcomePage } from '../pages/WelcomePage/HeaderWelcomePage';

import styles from './styles.module.scss';

export const Layout = () => {
  const location = useLocation();
  const { token } = useAppSelector(getDataUserSelector);
  const refHeader = useRef<HTMLDivElement>(null);
  const layoutWithStandardHeader =
    location.pathname !== '/' && location.pathname !== '/form' && token;

  useEffect(() => {
    const isSticky = () => {
      const scrollTop = window.scrollY;

      if (refHeader.current && token) {
        const headerHeight = 100;
        scrollTop >= headerHeight
          ? refHeader.current.classList.add(styles.scroll)
          : refHeader.current.classList.remove(styles.scroll);
      }
    };
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <header ref={refHeader} className={layoutWithStandardHeader ? styles.stickyHeader : ''}>
        {layoutWithStandardHeader && <Header />}
        {location.pathname === '/' && <HeaderWelcomePage />}
      </header>

      <main className={!layoutWithStandardHeader ? styles.mainWrapperBig : ''}>
        <Outlet />
      </main>

      <footer className={styles.footerWrapper}>
        <Footer />
      </footer>
    </div>
  );
};
