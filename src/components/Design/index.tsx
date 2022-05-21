import { useState } from 'react';
import styles from './styles.module.scss';
import { Header } from './Header';
import { Main } from './Main';

export const Design = () => {
  return (
    <>
      <section>
        <header>
          <Header />
        </header>

        <main>
          <Main />
        </main>

        <footer className={styles.footerWrapper}></footer>
      </section>
    </>
  );
};
