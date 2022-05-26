import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { editProfileSelector } from '../../../store/editProfileSlice';
import { loginSelector } from '../../../store/selectors';
import { authorizedSelector, fetchUsers, usersSelector } from '../../../store/usersSlice';
import { getMessage } from '../../../utils/getMessage';
import { Spinner } from '../../Spinner';
import { EditProfileForm } from './EditProfileForm';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';

import styles from './styles.module.scss';

export const EditProfileFormContainer = () => {
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const currentUser = users.find((user) => user.login === login);
  const { isError, isLoading, errorMessage } = useAppSelector(editProfileSelector);
  const authorized = useAppSelector(authorizedSelector);
  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

  useEffect(() => {
    if (!authorized) {
      localStorage.clear();
      dispatch(getTokenWithLocalStorage(''));
      navigate('/');
    }
  }, [authorized, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [isError, errorMessage, enqueueSnackbar]);

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      {currentUser ? <EditProfileForm currentUser={currentUser} /> : null}
    </div>
  );
};
