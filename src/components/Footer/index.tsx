import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <div className={`${styles.container} ${styles.containerMedium}  ${styles.footer}`}>
      <div className={styles.footerRssCourse}>
        <a
          href="https://rs.school/react/"
          className={styles.footerLogo}
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
      <div className={styles.footerGithubBlock}>
        <a
          href={'https://github.com/sharovskiye'}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.footerLink} ${styles.link}`}
        >
          Yevhenii
        </a>
        <a
          href={'https://github.com/Bogdan-VS'}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.footerLink} ${styles.link}`}
        >
          Bogdan
        </a>
        <a
          href={'https://github.com/nnadeysha'}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.footerLink} ${styles.link}`}
        >
          Nadezhda
        </a>
      </div>
      <div className={styles.footerYear}>© 2022</div>
    </div>
  );
};
