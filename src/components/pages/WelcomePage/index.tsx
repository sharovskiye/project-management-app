import { AboutCourse } from './AboutCourse';
import { AboutProject } from './AboutProject';
import { AboutTeam } from './AboutTeam';
import { SignContainer } from './SignContainer';

import styles from './styles.module.scss';

export const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={`${styles.wrapperContainer} ${styles.wrapperHeader}`}>
          <h1 className={styles.headerTitle}>Project Management System</h1>
          <SignContainer />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.wrapperContainer}>
          <AboutProject />
          <AboutTeam />
          <AboutCourse />
        </div>
      </main>
    </div>
  );
};
