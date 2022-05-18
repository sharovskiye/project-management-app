import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.containerMedium}  ${styles.footer}`}>
      <div className={styles.footerGithubBlock}>
        <a
          href={'https://github.com/sharovskiye'}
          className={`${styles.footerLink} ${styles.link}`}
        >
          Yevhenii
        </a>
        <a href={'https://github.com/Bogdan-VS'} className={`${styles.footerLink} ${styles.link}`}>
          Bogdan
        </a>
        <a href={'https://github.com/nnadeysha'} className={`${styles.footerLink} ${styles.link}`}>
          Nadezhda
        </a>
      </div>
      <div className={styles.footerYear}>
        <p>© 2022</p>
      </div>
      <div className={styles.footerRssCourse}>
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.footerLink} ${styles.link} ${styles.footerLogo}`}
        ></a>
      </div>
    </div>
  );
};
