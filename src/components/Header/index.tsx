import { Button } from '@mui/material';
import { useState } from 'react';
import { ThemeContext, themes } from '../../providers';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';

import styles from './styles.module.scss';

type HeaderPropsType = {
  signOut: () => void;
  userName: string;
  theme: string;
};
export const Header = ({ signOut, userName, theme }: HeaderPropsType) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header} ${theme}`}>
      <button className={styles.btn}>Button</button>
      <div className={styles.dropdown}>
        <button className={styles.btn} /* style="border-left:1px solid #0d8bf2" */>
          {userName}
        </button>
        <div className={styles.dropdownContent}>
          <a href="#">Edit profile</a>
          <a href="#" onClick={signOut}>
            Sign Out
          </a>
        </div>
      </div>
      <ul className={styles.headerButtonGroup}>
        <li className={styles.headerButton}>
          <ul>
            {userName}
            <li>
              <Button
                variant="outlined"
                color="inherit"
                className={styles.button}
                onClick={signOut}
              >
                Sign Out
              </Button>
            </li>
            <li>
              <Button variant="outlined" color="inherit" className={styles.button}>
                Edit profile
              </Button>
            </li>
          </ul>
        </li>
        <li className={styles.headerButton}>
          <Button variant="outlined" color="inherit" className={styles.button} onClick={signOut}>
            Sign Out
          </Button>
        </li>
        <li className={styles.headerButton}>
          <Button variant="outlined" color="inherit" className={styles.button}>
            Create new board
          </Button>
        </li>
      </ul>
      <div className={styles.headerSettingsBlock}>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <SwitchTheme
              onChangeTheme={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
          )}
        </ThemeContext.Consumer>
        <div className={styles.selectWrapper}>
          <CustomSelect />
        </div>
      </div>
      <span className={`${styles.line}`}></span>
    </div>
  );
};
