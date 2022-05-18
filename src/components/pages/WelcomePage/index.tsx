import { useAppSelector } from '../../../store/hook';
import { getDataUserSelector } from '../../../store/selectors';
import { Footer } from '../../Footer';
import { AboutCourse } from './AboutCourse';
import { AboutProject } from './AboutProject';
import { AboutTeam } from './AboutTeam';
import { SignContainer } from './SignContainer';
import { UpToMain } from './UpToMain';

import styles from './styles.module.scss';

export const WelcomePage = () => {
  const { token } = useAppSelector(getDataUserSelector);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Project Management System</h1>
        {token ? <UpToMain /> : <SignContainer />}
      </header>
      <main className={styles.main}>
        <AboutProject />
        <AboutTeam />
        <AboutCourse />
      </main>
      <Footer />
    </div>
  );
};
