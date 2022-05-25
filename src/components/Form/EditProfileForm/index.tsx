import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { FormTextField } from '../../FormTextField';
import {
  editProfileSelector,
  fetchDeleteProfile,
  fetchEditProfile,
} from '../../../store/editProfileSlice';
import { useCallback, useEffect } from 'react';
import { loginSelector } from '../../../store/selectors';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { useToggle } from '../../../utils/CustomHook';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, usersSelector } from '../../../store/fetchUsers';

import styles from './styles.module.scss';
import { setAuthorized } from '../../../store/boardSlice';
import { getTokenWithLocalStorage, getUserData } from '../../../store/signInUpSlice';
import { useSnackbar } from 'notistack';
import { getMessage } from '../../../utils/getMessage';
import { Spinner } from '../../Spinner';

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const EditProfileForm = () => {
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  const { opened, onToggle } = useToggle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = users.filter((user) => user.login === login);
  const { isError, isLoading, errorMessage } = useAppSelector(editProfileSelector);

  useEffect(() => {
    dispatch(fetchUsers(''));
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [isError, errorMessage, enqueueSnackbar]);

  const onDelete = useCallback(() => {
    localStorage.clear();

    dispatch(fetchDeleteProfile(currentUser[0]));
    dispatch(getTokenWithLocalStorage(''));
    dispatch(setAuthorized(false));
    navigate('/');
  }, [dispatch, currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      name: currentUser[0].name,
      login: currentUser[0].login,
      password: '',
      id: currentUser[0].id,
    },
    onSubmit: (values) => {
      const currentData = { ...values };

      dispatch(fetchEditProfile(currentData));
      dispatch(getUserData(values));
      formik.resetForm();
      navigate('/main');
    },
    validationSchema: signUpSchema,
  });

  return (
    <div className={styles.container}>
      {isLoading && <Spinner />}
      <Box
        sx={{
          width: '300px',
          height: 'fit-content',
          typography: 'body1',
          margin: '0 auto',
          padding: 2,
          borderRadius: '6px',
          boxShadow: '0px 0px 8px 2px rgba(34, 60, 80, 0.5)',
          bgcolor: '#ffffff',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ margin: '20px 0' }}
          >
            <FormTextField
              type="text"
              label="Name"
              name="name"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
            />
            <FormTextField
              type="password"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
              value={formik.values.password}
            />
            <Button
              type="submit"
              color="info"
              variant="outlined"
              disabled={!formik.isValid || !formik.dirty}
              sx={{ marginTop: '10px' }}
            >
              Submit
            </Button>
            <Button variant="outlined" color="error" sx={{ marginTop: '10px' }} onClick={onToggle}>
              Delete user
            </Button>
          </Grid>
        </form>
      </Box>
      <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
    </div>
  );
};