import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { changeloading, fetchSignIn } from '../../../store/signInUpSlice';
import { FormTextField } from '../FormTextField';
import { getDataUserSelector } from '../../../store/selectors';

const signUpSchema = Yup.object().shape({
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignInForm = () => {
  const {
    token,
    setUserData: { name, login },
    loading,
  } = useAppSelector(getDataUserSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('personData', JSON.stringify({ token, name, login }));
    }
  }, [login, name, token]);

  useEffect(() => {
    if (loading === 'succeeded') {
      dispatch(changeloading('idle'));
      navigate('/main');
    }
  }, [loading, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      const currentValues = { ...values };

      dispatch(fetchSignIn(currentValues));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ rowGap: 2, margin: '20px 0' }}
      >
        <FormTextField
          type="text"
          label="Login"
          name="login"
          onChange={formik.handleChange}
          error={formik.errors.login}
          value={formik.values.login}
        />
        <FormTextField
          type="password"
          label="Password"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
          value={formik.values.password}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </Button>
      </Grid>
    </form>
  );
};
