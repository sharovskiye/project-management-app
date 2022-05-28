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
      .min(2, t('form.Too Short!'))
      .max(20, t('form.Too Long!'))
      .required(t('form.required')),
    login: Yup.string()
      .trim()
      .min(2, t('form.Too Short!'))
      .max(20, t('form.Too Long!'))
      .required(t('form.required')),
    password: Yup.string()
      .trim()
      .min(5, t('form.Too Short!'))
      .max(15, t('form.Too Long!'))
      .required(t('form.required')),
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
          label={t('form.Name')}
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name}
          value={formik.values.name}
        />
        <FormTextField
          type="text"
          label={t('form.Login')}
          name="login"
          onChange={formik.handleChange}
          error={formik.errors.login}
          value={formik.values.login}
        />
        <FormTextField
          type="password"
          label={t('form.Password')}
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
