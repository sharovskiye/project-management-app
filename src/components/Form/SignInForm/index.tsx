import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../store/hooks';
import { fetchSignIn } from '../../../store/signInUpSlice';
import { FormTextField } from '../../FormTextField';

export const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .trim()
      .min(2, t('Too Short!'))
      .max(20, t('Too Long!'))
      .required(t('Required!')),
    password: Yup.string()
      .trim()
      .min(5, t('Too Short!'))
      .max(15, t('Too Long!'))
      .required(t('Required!')),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(fetchSignIn(values));
      formik.resetForm();
    },
    validationSchema,
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
          label={t('Login')}
          name="login"
          onChange={formik.handleChange}
          error={formik.errors.login}
          value={formik.values.login}
        />
        <FormTextField
          type="password"
          label={t('Password')}
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
          value={formik.values.password}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          {t('Sign In')}
        </Button>
      </Grid>
    </form>
  );
};
