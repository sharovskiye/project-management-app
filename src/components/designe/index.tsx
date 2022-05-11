import React from 'react';
import styles from './styles.module.scss';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export const Design = () => {
  return (
    <>
      {/* LIGHT THEME */}
      <section>
        <header className={`${styles.lightTheme}`}>
          <Header />
        </header>

        <main className={`${styles.lightTheme}`}>
          <Main />
        </main>

        <footer className={`${styles.darkTheme}`}>
          <Footer />
        </footer>
      </section>

      {/* DARK THEME */}
      <section>
        <header className={`${styles.darkTheme}`}>
          <Header />
        </header>

        <main className={`${styles.darkTheme}`}>
          <Main />
        </main>

        <footer className={`${styles.lightTheme}`}>
          <Footer />
        </footer>
      </section>
    </>
  );
};
