import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const SignUp = () => {
  return (
    <Link to="/form">
      <button className={styles.logUpBtn}>Sign up</button>
    </Link>
  );
};
