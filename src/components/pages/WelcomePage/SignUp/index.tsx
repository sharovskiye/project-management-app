import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SignContainer } from '../../../../const/SignInUp';

import { useAppDispatch } from '../../../../store/hooks';
import { changeSignConteiner } from '../../../../store/signInUpSlice';

import styles from './styles.module.scss';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const openSignUp = useCallback(() => {
    dispatch(changeSignConteiner(SignContainer.signUp));
  }, [dispatch]);

  return (
    <Link to="/form">
      <button className={styles.signUpBtn} onClick={openSignUp}>
        Sign up
      </button>
    </Link>
  );
};
