import { Link } from '@mui/material';
import styles from '../styles.module.scss';

export const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.container__medium}  ${styles.footer}`}>
      <div className={styles.footer_githubBlock}>
        <Link className={`${styles.footer_link} ${styles.link}`}>GITHUB</Link>
        <Link className={`${styles.footer_link} ${styles.link}`}>GITHUB</Link>
        <Link className={`${styles.footer_link} ${styles.link}`}>GITHUB</Link>
      </div>
      <div className={styles.footer_year}>
        <p>2022</p>
      </div>
      <div className={styles.footer_rssCourse}>
        <Link className={`${styles.footer_link} ${styles.link}`}>RSS</Link>
      </div>
    </div>
  );
};
