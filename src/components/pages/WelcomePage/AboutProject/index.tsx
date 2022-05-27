import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export const AboutProject = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.title}>{t('welcome page.About project')}</h2>
      <div className={styles.wrapper}>
        <p className={styles.subtitle}>
          <strong>Project Management System</strong> -{' '}
          {t(
            'welcome page.an application that helps an individual in a team or group of developers achieve their objectives.'
          )}
        </p>
        <p className={styles.subtitle}>
          {t(
            'welcome page.We have tried to develop a convenient and multifunctional application that will help you control your tasks. The application is localized in two languages.'
          )}
        </p>
      </div>
    </>
  );
};
