import { AboutCourse } from './AboutCourse';
import { AboutProject } from './AboutProject';
import { AboutTeam } from './AboutTeam';

import styles from './styles.module.scss';

export const WelcomePage = () => {
  return (
    <div className={styles.main}>
      <div className={`${styles.wrapperContainer} ${styles.content}`}>
        <AboutProject />
        <AboutTeam />
        <AboutCourse />
      </div>
    </div>
  );
};
