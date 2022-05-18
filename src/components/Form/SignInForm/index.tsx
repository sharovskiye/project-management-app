import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../store/hook';
import { fetchSignIn } from '../../../store/signInUpSlice';
import { FormTextField } from '../FormTextField';

const signUpSchema = Yup.object().shape({
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignInForm = () => {
  const dispatch = useAppDispatch();

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
        sx={{ margin: '20px 0' }}
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
