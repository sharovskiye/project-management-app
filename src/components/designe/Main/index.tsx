import { Board } from '../Board';
import styles from '../styles.module.scss';

export const Main = () => {
  return (
    <div className={`${styles.container} ${styles.container__medium}  ${styles.main}`}>
      <Board />
    </div>
  );
};
