import styles from './styles.module.scss';

type FooterPropsType = {
  theme: string;
};
export const Footer = ({ theme }: FooterPropsType) => {
  return (
    <div className={`${styles.container} ${styles.containerMedium}  ${styles.footer} ${theme}`}>
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
      <div className={styles.footerYear}>
        <p>© 2022</p>
      </div>
      <div className={styles.footerRssCourse}>
        <a
          href="https://rs.school/react/"
          className={styles.footerLogo}
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </div>
  );
};
