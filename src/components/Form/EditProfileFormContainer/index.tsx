import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { editProfileSelector } from '../../../store/editProfileSlice';
import { loginSelector } from '../../../store/selectors';
import { fetchUsers, usersSelector } from '../../../store/usersSlice';
import { getMessage } from '../../../utils/getMessage';
import { Spinner } from '../../Spinner';
import { EditProfileForm } from './EditProfileForm';

import styles from './styles.module.scss';

export const EditProfileFormContainer = () => {
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = users.find((user) => user.login === login);
  const { isError, isLoading, errorMessage } = useAppSelector(editProfileSelector);

  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

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
