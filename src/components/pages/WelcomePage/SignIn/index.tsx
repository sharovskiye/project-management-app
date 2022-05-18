import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SignContainer } from '../../../../const/SignInUp';

import { useAppDispatch } from '../../../../store/hook';
import { changeSignConteiner } from '../../../../store/signInUpSlice';

import styles from './styles.module.scss';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const openSignIn = useCallback(() => {
    dispatch(changeSignConteiner(SignContainer.signIn));
  }, [dispatch]);

  return (
    <Link to="/form">
      <button className={styles.signInBtn} onClick={openSignIn}>
        Sign in
      </button>
    </Link>
  );
};
