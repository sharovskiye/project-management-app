import { Button } from '@mui/material';
import { useState } from 'react';
import { ThemeContext, themes } from '../../providers';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';

import styles from './styles.module.scss';

type HeaderPropsType = {
  signOut: () => void;
  userName: string;
};
export const Header = ({ signOut, userName }: HeaderPropsType) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={styles.headerButtonGroup}>
        <div className={styles.dropdown}>
          <div className={styles.headerButton}>
            <Button variant="outlined" color="inherit">
              {userName}
            </Button>
          </div>
          <div className={styles.dropdownContent}>
            <a href="#">Edit profile</a>
            <a href="#" onClick={signOut}>
              Sign Out
            </a>
          </div>
        </div>
        <div className={styles.headerButton}>
          <Button variant="outlined" color="inherit" className={styles.button}>
            Create new board
          </Button>
        </div>
      </div>
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
