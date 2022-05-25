import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { editProfileSelector } from '../../../store/editProfileSlice';
import { useEffect } from 'react';
import { loginSelector } from '../../../store/selectors';
import { fetchUsers, usersSelector } from '../../../store/fetchUsers';
import { useSnackbar } from 'notistack';
import { getMessage } from '../../../utils/getMessage';
import { Spinner } from '../../Spinner';
import { EditProfileForm } from './EditProfileForm';

import styles from './styles.module.scss';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { useNavigate } from 'react-router-dom';
import { boardSelector } from '../../../store/boardSlice';

export const EditProfileFormContainer = () => {
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const currentUser = users.find((user) => user.login === login);
  const { isError, isLoading, errorMessage } = useAppSelector(editProfileSelector);
  const { authorized } = useAppSelector(boardSelector);

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
