import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext, themes } from '../../providers';
import { fetchUsers, usersSelector } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSelector } from '../../store/selectors';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';

import styles from './styles.module.scss';

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);

  useEffect(() => {
    dispatch(fetchUsers(''));
  }, []);

  const userNameTitle = useCallback(() => {
    console.log(users);
    return users.map((user) => {
      if (user.login === login) {
        return user.name;
      }
    });
  }, [login, users]);

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={styles.headerButtonGroup}>
        <div className={styles.dropdown}>
          <div className={styles.headerButton}>
            <Button variant="outlined" color="inherit">
              {userNameTitle()}
            </Button>
          </div>
          <div className={styles.dropdownContent}>
            <Link to="/profile">Edit profile</Link>
            <a href="#" onClick={logOut}>
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
                setIsDarkTheme(!isDarkTheme);
                setIsChecked(!isChecked);
                changeTheme(isDarkTheme ? themes.light : themes.dark);
              }}
              isChecked
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
