import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const AboutCourse = () => {
  const { t } = useTranslation();

  // return <h1>{t('Welcome to React')}</h1>

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('welcome page.About Course')}</h2>
      <p className={styles.subTitle}>
        This is a reaction course designed for RS School students of the 2021Q3 set who have passed
        RS School stage #2, as well as for new students who have knowledge and practical experience
        in using the following technologies and tools:
      </p>
      <ul className={styles.listContainer}>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Git, GitHub (clone, add, commit, push, pull, merge, rebase, work with Pull Request)</li>
        <li>NPM, Webpack</li>
        <li>CSS3 / HTML5</li>
        <li>REST API</li>
      </ul>
      <p className={styles.subTitle}>
        During the course the work with class components, react-router v6, hooks, forms, api, custom
        app state and redux was studied.
      </p>
    </div>
  );
};
