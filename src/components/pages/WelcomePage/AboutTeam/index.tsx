import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Person } from '../Person';
import { IPerson } from '../Person';
import { teamMembers } from './const';

import styles from './styles.module.scss';

export const AboutTeam = () => {
  const { t } = useTranslation();

  const team = useMemo(() => {
    return teamMembers.map((items: IPerson) => {
      return <Person {...items} key={items.name} />;
    });
  }, []);

  return (
    <>
      <h2 className={styles.title}>{t('About team')}</h2>
      <div className={styles.wrapper}>{team}</div>
    </>
  );
};
