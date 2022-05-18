import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Header } from './Header';
import { Main } from './Main';

export const Design = () => {
  const [isCheckedTheme, setIsCheckedTheme] = useState(true);

  return (
    <>
      <section className={isCheckedTheme ? styles.darkTheme : styles.lightTheme}>
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
