import { Button, FormControl, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import styles from '../styles.module.scss';

export const Header = () => {
  const [language, setLanguage] = useState('RU');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={`${styles.container} ${styles.container__big}  ${styles.header}`}>
      <div className={` ${styles.link}`}>HEADER</div>
      <Link className={`${styles.header_link} ${styles.link}`}>HEADER LINK</Link>
      <Button variant="outlined" className={`${styles.header_button} ${styles.button}`}>
        Header button
      </Button>
      <FormControl className={styles.form}>
        <Select className={styles.form_select} value={language} onChange={handleChange}>
          <MenuItem value={'RU'}>RU</MenuItem>
          <MenuItem value={'EN'}>EN</MenuItem>
        </Select>
      </FormControl>
      <span className={`${styles.line}`}></span>
    </div>
  );
};
