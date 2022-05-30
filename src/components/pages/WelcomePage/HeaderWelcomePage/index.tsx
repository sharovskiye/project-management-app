import { CustomSelect } from '../../../Inputs/CustomSelect';
import { SignContainer } from '../SignContainer';
import styles from '../styles.module.scss';

export const HeaderWelcomePage = () => {
  return (
    <div className={`${styles.wrapperContainer} ${styles.wrapperHeader}`}>
      <h1 className={styles.headerTitle}>Project Management System</h1>
      <div className={styles.headerButtons}>
        <SignContainer />
        <div className={styles.selectWrapper}>
          <CustomSelect />
        </div>
      </div>
    </div>
  );
};
