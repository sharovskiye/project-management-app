import { Button, FormControl, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import style from '../style.module.scss';

export const Header = () => {
  const [language, setLanguage] = useState('RU');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={`${style.container} ${style.container__big}  ${style.header}`}>
      <div className={`${style.header_link} ${style.link}`}>HEADER</div>
      <Link className={`${style.header_link} ${style.link}`}>HEADER LINK</Link>
      <Button variant="outlined" className={`${style.header_button} ${style.button}`}>
        Header button
      </Button>
      <FormControl className={style.form}>
        <Select className={style.form_select} value={language} onChange={handleChange}>
          <MenuItem value={'RU'}>RU</MenuItem>
          <MenuItem value={'EN'}>EN</MenuItem>
        </Select>
      </FormControl>
      <span className={`${style.line}`}></span>
    </div>
  );
};
