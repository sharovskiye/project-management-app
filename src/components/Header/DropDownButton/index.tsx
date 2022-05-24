import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers, usersSelector } from '../../../store/fetchUsers';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginSelector } from '../../../store/selectors';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';

import styles from '../styles.module.scss';

export const DropDownButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

  const userNameTitle = useCallback(() => {
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
  );
};
