import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { ThemeContext, themes } from '../../providers';
import { useAppDispatch } from '../../store/hooks';
import { toggleModalVisible } from '../../store/mainBoardSlice';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';
import { DropDownButton } from './DropDownButton';

import styles from './styles.module.scss';

const getIsSwitchTheme = () => {
  const isSwitchLS = window?.localStorage?.getItem('isSwitchTheme');
  const isSwitch = isSwitchLS !== null ? JSON.parse(isSwitchLS) : true;
  return isSwitch;
};
export const Header = () => {
  const [isChecked, setIsChecked] = useState(getIsSwitchTheme);

  const dispatch = useAppDispatch();

  const createNewBoard = useCallback(() => {
    dispatch(toggleModalVisible());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('isSwitchTheme', JSON.stringify(isChecked));
  }, [isChecked]);

  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={styles.headerButtonGroup}>
        <DropDownButton />
        <div className={styles.headerButton}>
          <Button
            variant="outlined"
            color="inherit"
            className={styles.button}
            onClick={createNewBoard}
          >
            Create new board
          </Button>
        </div>
      </div>
      <div className={styles.headerSettingsBlock}>
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <SwitchTheme
              onChangeTheme={() => {
                const currentTheme = isChecked ? themes.light : themes.dark;

                setIsChecked((prevValue: boolean) => !prevValue);
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
