import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchUsers } from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userNameSelector } from '../../../store/selectors';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';

import styles from '../styles.module.scss';

type DropDownButtonPropsType = {
  isBurger: boolean;
  onClose: () => void;
};
export const DropDownButton = ({ isBurger, onClose }: DropDownButtonPropsType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

  const userNameTitle = useAppSelector(userNameSelector);

  const style = isBurger ? styles.link : styles.outlinedButton;

  const logOut = useCallback(() => {
    localStorage.clear();

    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.headerButton}>
        <a className={style}>{userNameTitle}</a>
      </div>
      <div className={styles.dropdownContent}>
        <Link to="/profile" onClick={onClose}>
          {t('Edit profile')}
        </Link>
        <a href="#" onClick={logOut}>
          {t('Sign Out')}
        </a>
      </div>
    </div>
  );
};
