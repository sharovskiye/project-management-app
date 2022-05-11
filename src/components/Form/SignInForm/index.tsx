import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { getDataUserSelector } from '../../../store/selectors';
import { fetchSignIn } from '../../../store/signInSlice';

import styles from './styles.module.scss';
import { FormTextField } from '../FormTextField';

const signUpSchema = Yup.object().shape({
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignInForm = () => {
  const {
    token,
    userData: { name, login },
  } = useAppSelector(getDataUserSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      localStorage.setItem('personData', JSON.stringify({ token, name, login }));
    }
  }, [login, name, token]);

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
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <FormTextField
          type="text"
          label="Login"
          name="login"
          onChange={formik.handleChange}
          error={formik.errors.login}
        />
        <FormTextField
          type="password"
          label="Password"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </Button>
      </form>
    </>
  );
};
