import styles from '../styles.module.scss';

export const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.containerMedium}  ${styles.footer}`}>
      <div className={styles.footerGithubBlock}>
        <a href={''} className={`${styles.footerLink} ${styles.link}`}>
          GITHUB
        </a>
        <a href={''} className={`${styles.footerLink} ${styles.link}`}>
          GITHUB
        </a>
        <a href={''} className={`${styles.footerLink} ${styles.link}`}>
          GITHUB
        </a>
      </div>
      <div className={styles.footerYear}>
        <p>2022</p>
      </div>
      <div className={styles.footerRssCourse}>
        <a href={''} className={`${styles.footerLink} ${styles.link}`}>
          RSS
        </a>
      </div>
    </div>
  );
};
