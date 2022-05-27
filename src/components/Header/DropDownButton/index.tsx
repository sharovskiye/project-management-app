import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchUsers } from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userNameSelector } from '../../../store/selectors';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';

import styles from '../styles.module.scss';

export const DropDownButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

  const userNameTitle = useAppSelector(userNameSelector);

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.headerButton}>
        <Button variant="outlined" color="inherit">
          {userNameTitle}
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
