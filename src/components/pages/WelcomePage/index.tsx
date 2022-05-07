import { Footer } from '../Footer';
import { AboutCourse } from './AboutCourse';
import { AboutProject } from './AboutProject';
import { AboutTeam } from './AboutTeam';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';

import styles from './styles.module.scss';

export const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className="title">Project Management System</h1>
        <div className={styles.regContainer}>
          <LogIn />
          <SignUp />
        </div>
      </header>
      <main>
        <AboutProject />
        <AboutTeam />
        <AboutCourse />
      </main>
      <Footer />
    </div>
  );
};
