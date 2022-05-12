import { ChangeEvent, useState } from 'react';

import styles from './styles.module.scss';

export const CustomSelect = () => {
  const [language, setLanguage] = useState('RU');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <select className={styles.select} defaultValue={'RU'} value={language} onChange={handleChange}>
      <option className={styles.option} value="RU">
        RU
      </option>
      <option className={styles.option} value="EN">
        EN
      </option>
    </select>
  );
};
