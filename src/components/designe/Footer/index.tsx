import styles from '../styles.module.scss';

export const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.container__medium}  ${styles.footer}`}>
      <div className={styles.footer_githubBlock}>
        <a href={''} className={`${styles.footer_link} ${styles.link}`}>
          GITHUB
        </a>
        <a href={''} className={`${styles.footer_link} ${styles.link}`}>
          GITHUB
        </a>
        <a href={''} className={`${styles.footer_link} ${styles.link}`}>
          GITHUB
        </a>
      </div>
      <div className={styles.footer_year}>
        <p>2022</p>
      </div>
      <div className={styles.footer_rssCourse}>
        <a href={''} className={`${styles.footer_link} ${styles.link}`}>
          RSS
        </a>
      </div>
    </div>
  );
};
