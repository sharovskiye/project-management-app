import { Button } from '@mui/material';
import { useState } from 'react';
import { ThemeContext, themes } from '../../providers';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';
import { DropDownButton } from './DropDownButton';

import styles from './styles.module.scss';

const getIsSwitchTheme = () => {
  const isSwitchLS = window?.localStorage?.getItem('isSwitchTheme');
  const isSwitch = isSwitchLS !== null ? JSON.parse(isSwitchLS) : false;
  return isSwitch;
};
export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isChecked, setIsChecked] = useState(getIsSwitchTheme || false);

  const currentTheme = isDarkTheme ? themes.dark : themes.light;

  localStorage.setItem('isSwitchTheme', JSON.stringify(isChecked));
  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={styles.headerButtonGroup}>
        <DropDownButton />
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
                setIsDarkTheme(!isDarkTheme);
                setIsChecked(!isChecked);
                changeTheme(currentTheme);
              }}
              isChecked={isChecked}
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
