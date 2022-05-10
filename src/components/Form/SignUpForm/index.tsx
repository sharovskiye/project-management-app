import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Name } from '../Name';
import { Login } from '../Login';
import { Password } from '../Password';

import styles from './styles.module.scss';
import { Button } from '@mui/material';
import { IPerson } from '../../../services/type';
import { fetchSignUp } from '../../../store/signUpSlice';
import { useEffect } from 'react';
import { fetchSignIn } from '../../../store/signInSlice';
import { getDataUserSelector } from '../../../store/selectors';
import { useAppSelector } from '../../../store/hook';

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignUpForm = () => {
  const { login, password } = useAppSelector(getDataUserSelector);

  useEffect(() => {
    fetchSignIn({ login, password });
    console.log(login, password);
  }, [login, password]);

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    onSubmit: (values: IPerson) => {
      fetchSignUp(values);
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Name
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors}
        />
        <Login
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
          error={formik.errors}
        />
        <Password
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </Button>
      </form>
    </>
  );
};
