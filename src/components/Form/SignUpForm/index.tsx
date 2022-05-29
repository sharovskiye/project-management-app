import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { IPerson } from '../../../services/type';
import { fetchSignUp, getUserData } from '../../../store/signInUpSlice';
import { useAppDispatch } from '../../../store/hooks';
import { FormTextField } from '../../FormTextField';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, t('Too Short!'))
      .max(20, t('Too Long!'))
      .required(t('Required!')),
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
      name: '',
      login: '',
      password: '',
    },
    onSubmit: (values: IPerson) => {
      dispatch(fetchSignUp(values));
      dispatch(getUserData(values));
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
          label={t('Name')}
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name}
          value={formik.values.name}
        />
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
        <Button
          type="submit"
          variant="outlined"
          disabled={!formik.isValid || !formik.dirty}
          sx={{ marginTop: '10px' }}
        >
          {t('Sign Up')}
        </Button>
      </Grid>
    </form>
  );
};
