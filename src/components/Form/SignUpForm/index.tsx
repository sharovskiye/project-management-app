import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';

import { IPerson } from '../../../services/type';
import { fetchSignUp, getUserData } from '../../../store/signInUpSlice';
import { useAppDispatch } from '../../../store/hook';
import { FormTextField } from '../FormTextField';

const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  login: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('required'),
});

export const SignUpForm = () => {
  const dispatch = useAppDispatch();

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
        <Button
          type="submit"
          variant="outlined"
          disabled={!formik.isValid || !formik.dirty}
          sx={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};
