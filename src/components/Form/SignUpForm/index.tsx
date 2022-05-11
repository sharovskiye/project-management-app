import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';

import { IPerson } from '../../../services/type';
import { fetchSignUp } from '../../../store/signUpSlice';
import { fetchSignIn, getUserData } from '../../../store/signInSlice';
import { getDataUserSelector } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

import styles from './styles.module.scss';
import { FormTextField } from '../FormTextField';

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignUpForm = () => {
  const {
    userData: { login, password },
  } = useAppSelector(getDataUserSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (login && password) {
      dispatch(fetchSignIn({ login, password }));
    }
  }, [login, password, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    onSubmit: (values: IPerson) => {
      const currentData = { ...values };

      dispatch(fetchSignUp(currentData));
      dispatch(getUserData(currentData));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <FormTextField
        type="text"
        label="Name"
        name="name"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
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
  );
};
