import { Trans, useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export const AboutProject = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.title}>{t('About project')}</h2>
      <div className={styles.wrapper}>
        <p className={styles.subtitle}>
          <Trans i18nKey="<strong>Project Management System</strong> - an application that helps an individual in a team or group of developers achieve their objectives." />
        </p>
        <p className={styles.subtitle}>
          {t(
            'We have tried to develop a convenient and multifunctional application that will help you control your tasks. The application is localized in two languages.'
          )}
        </p>
      </div>
    </>
  );
};
