import React from 'react';
import style from './style.module.scss';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main/Main';

export const Designe = () => {
  return (
    <>
      {/* LIGHT THEME */}
      <section>
        <header className={`${style.lightTheme}`}>
          <Header />
        </header>

        <main className={`${style.lightTheme}`}>
          <Main />
        </main>

        <footer className={`${style.darkTheme}`}>
          <Footer />
        </footer>
      </section>

      {/* DARK THEME */}
      <section>
        <header className={`${style.darkTheme}`}>
          <Header />
        </header>

        <main className={`${style.darkTheme}`}>
          <Main />
        </main>

        <footer className={`${style.lightTheme}`}>
          <Footer />
        </footer>
      </section>
    </>
  );
};
