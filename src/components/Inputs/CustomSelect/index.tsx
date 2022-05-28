import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export const CustomSelect = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} value={i18n.language} onChange={handleChange}>
        <option className={styles.option} value="ru">
          RU
        </option>
        <option className={styles.option} value="en">
          EN
        </option>
      </select>
    </div>
  );
};
