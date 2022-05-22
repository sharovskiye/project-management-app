import { Header } from './Header';
import { Main } from './Main';

import styles from './styles.module.scss';

export const Design = () => {
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
