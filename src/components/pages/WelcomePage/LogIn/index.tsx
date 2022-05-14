import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const LogIn = () => {
  return (
    <Link to="/form">
      <button className={styles.signInBtn}>Sign in</button>
    </Link>
  );
};
