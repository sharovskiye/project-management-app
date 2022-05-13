import { Board } from '../Board';

import styles from '../styles.module.scss';

export const Main = () => {
  return (
    <div className={`${styles.container} ${styles.containerMedium}  ${styles.main}`}>
      <Board />
    </div>
  );
};
