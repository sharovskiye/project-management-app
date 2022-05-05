import React from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, Link, Button } from '@mui/material';
import { useState } from 'react';
import style from './style.module.scss';
import { Column } from './Column';

export const Designe = () => {
  const [age, setAge] = useState('RU');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };

  return (
    <>
      <section>
        <header className={`${style.lightTheme}`}>
          <div className={`${style.container} ${style.container__big}  ${style.header}`}>
            <div className={`${style.header_link} ${style.link}`}>HEADER</div>
            <Link className={`${style.header_link} ${style.link}`}>HEADER LINK</Link>
            <Button variant="outlined" className={`${style.header_button} ${style.button}`}>
              Header button
            </Button>
            <FormControl className={style.form}>
              <Select className={style.form_select} value={age} onChange={handleChange}>
                <MenuItem value={'RU'}>RU</MenuItem>
                <MenuItem value={'EN'}>EN</MenuItem>
              </Select>
            </FormControl>
            <span className={`${style.line}`}></span>
          </div>
        </header>

        <main className={`${style.lightTheme}`}>
          <div className={`${style.container} ${style.container__medium}  ${style.main}`}>
            <Column />
          </div>
        </main>

        <footer className={`${style.darkTheme}`}>
          <div className={`${style.container} ${style.container__medium}  ${style.footer}`}>
            <div className={style.footer_githubBlock}>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
            </div>
            <div className={style.footer_year}>
              <p>2022</p>
            </div>
            <div className={style.footer_rssCourse}>
              <Link className={`${style.footer_link} ${style.link}`}>RSS</Link>
            </div>
          </div>
        </footer>
      </section>

      <section>
        <header className={`${style.darkTheme}`}>
          <div className={`${style.container} ${style.container__big}  ${style.header}`}>
            <div className={`${style.header_link} ${style.link}`}>HEADER</div>
            <Link className={`${style.header_link} ${style.link}`}>HEADER LINK</Link>
            <Button variant="outlined" className={`${style.header_button} ${style.button}`}>
              Header button
            </Button>
            <FormControl className={style.form}>
              <Select className={style.form_select} value={age} onChange={handleChange}>
                <MenuItem value={'RU'}>RU</MenuItem>
                <MenuItem value={'EN'}>EN</MenuItem>
              </Select>
            </FormControl>
            <span className={`${style.line}`}></span>
          </div>
        </header>

        <main className={`${style.darkTheme}`}>
          <div className={`${style.container} ${style.container__medium}  ${style.main}`}>
            <Column />
          </div>
        </main>

        <footer className={`${style.lightTheme}`}>
          <div className={`${style.container} ${style.container__medium}  ${style.footer}`}>
            <div className={style.footer_githubBlock}>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
              <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
            </div>
            <div className={style.footer_year}>
              <p>2022</p>
            </div>
            <div className={style.footer_rssCourse}>
              <Link className={`${style.footer_link} ${style.link}`}>RSS</Link>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};
