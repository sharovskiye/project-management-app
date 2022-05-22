// import  { useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';

import styles from './styles.module.scss';

export const Design = () => {
  // const [isCheckedTheme, setIsCheckedTheme] = useState(true);

  return (
    <>
      <section className={true ? styles.darkTheme : styles.lightTheme}>
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
