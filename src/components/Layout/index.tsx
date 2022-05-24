import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getDataUserSelector } from '../../store/selectors';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './styles.module.scss';

export const Layout = () => {
  const location = useLocation();
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

  return (
    <div className={styles.wrapper}>
      <header ref={refHeader} className={stickyHeader}>
        {location.pathname !== '/' && location.pathname !== '/form' && <Header />}
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
