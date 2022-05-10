import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Login } from '../Login';
import { Password } from '../Password';

import styles from './styles.module.scss';

const signUpSchema = Yup.object().shape({
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
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
