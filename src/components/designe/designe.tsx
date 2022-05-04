import React from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, Link } from '@mui/material';
import { useState } from 'react';
import style from './style.module.scss';

export const Designe = () => {
  const [age, setAge] = useState('RU');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };

  return (
    <>
      <header className={`${style.wrapper__light} ${style.header}`}>
        <div className={`${style.container} ${style.container__big}`}>
          <div className={style.link}>OUR LOGO</div>
          <Link className={style.link}>Create new board</Link>
          <Link className={style.link}>Log Out</Link>
          <Link className={style.link}>Edit Prifile</Link>
          <FormControl className={style.form}>
            <Select className={style.form_select} value={age} onChange={handleChange}>
              <MenuItem value={'RU'}>RU</MenuItem>
              <MenuItem value={'EN'}>EN</MenuItem>
            </Select>
          </FormControl>
        </div>
      </header>
      <main className={`${style.wrapper__light} ${style.main}`}>
        <div className={`${style.container} ${style.container__medium}`}></div>
      </main>
      <footer className={`${style.wrapper__dark} ${style.footer}`}>
        <div className={`${style.container} ${style.container__medium}`}></div>
      </footer>
    </>
  );
};
