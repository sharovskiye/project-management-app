import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid } from '@mui/material';
import { IGetPerson } from '../../../../services/type';
import { useToggle } from '../../../../utils/CustomHook';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import {
  editProfileSelector,
  fetchDeleteProfile,
  fetchEditProfile,
} from '../../../../store/editProfileSlice';
import { getTokenWithLocalStorage, getUserData } from '../../../../store/signInUpSlice';
import { setAuthorized } from '../../../../store/boardSlice';
import { useCallback } from 'react';
import { Spinner } from '../../../Spinner';
import { FormTextField } from '../../../FormTextField';
import { ConfirmModalWindow } from '../../../Modal/ConfirmModal';

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

type EditProfileFormPropsType = {
  currentUser: IGetPerson;
};
export const EditProfileForm = ({ currentUser }: EditProfileFormPropsType) => {
  const { opened, onToggle } = useToggle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(editProfileSelector);

  const onDelete = useCallback(() => {
    localStorage.clear();
    if (currentUser) {
      dispatch(fetchDeleteProfile(currentUser));
      dispatch(getTokenWithLocalStorage(''));
      dispatch(setAuthorized(false));
      navigate('/');
    }
  }, [dispatch, currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      name: currentUser.name,
      login: currentUser.login,
      password: '',
      id: currentUser.id,
    },
    onSubmit: (values) => {
      const currentData = { ...values };
      dispatch(fetchEditProfile(currentData));
      dispatch(getUserData(values));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  return (
    <div>
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
