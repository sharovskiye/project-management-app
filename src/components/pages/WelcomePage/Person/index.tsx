import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export type IPerson = {
  src: string;
  name: string;
  description: string;
  github: string;
  role: string;
};

export const Person = memo(({ src, name, description, github, role }: IPerson) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img className={styles.image} src={src} alt={name} />
      </div>
      <div className={styles.wrapperContainer}>
        <h4 className={styles.title}>{t(`welcome page.${name}`)}</h4>
        <div className={styles.roleContainer}>
          <span className={styles.roleContainerTitle}>{role}</span>
          <a
            className={styles.roleContainerLink}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
});
