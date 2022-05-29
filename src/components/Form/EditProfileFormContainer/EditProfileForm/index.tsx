import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';

import { IGetPerson } from '../../../../services/type';
import { useToggle } from '../../../../utils/CustomHook';
import { useAppDispatch } from '../../../../store/hooks';
import { fetchDeleteProfile, fetchEditProfile } from '../../../../store/editProfileSlice';
import { getTokenWithLocalStorage, getUserData } from '../../../../store/signInUpSlice';
import { FormTextField } from '../../../FormTextField';
import { ConfirmModalWindow } from '../../../Modal/ConfirmModal';
import { setAuthorized } from '../../../../store/usersSlice';

import styles from '../styles.module.scss';

type EditProfileFormPropsType = {
  currentUser: IGetPerson;
};
export const EditProfileForm = memo(({ currentUser }: EditProfileFormPropsType) => {
  const { t } = useTranslation();
  const { opened, onToggle } = useToggle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDelete = useCallback(() => {
    localStorage.clear();
    if (currentUser) {
      dispatch(fetchDeleteProfile(currentUser));
      dispatch(getTokenWithLocalStorage(''));
      dispatch(setAuthorized(false));
      navigate('/');
    }
  }, [dispatch, currentUser, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
      name: currentUser.name,
      login: currentUser.login,
      password: '',
      id: currentUser.id,
    },
    onSubmit: (values) => {
      const currentData = { ...values };
      dispatch(fetchEditProfile(currentData));
      dispatch(getUserData(values));
    },
    validationSchema,
    enableReinitialize: true,
  });

  const backToMain = () => {
    navigate('/main');
  };

  return (
    <div>
      <Box
        sx={{
          width: '300px',
          height: 'fit-content',
          typography: 'body1',
          margin: '0 auto',
          padding: 2,
          borderRadius: '6px',
          boxShadow: '0px 0px 8px 2px rgba(34, 60, 80, 0.5)',
          bgcolor: '#ffffff',
        }}
      >
        <div className={styles.btnWrapper}>
          <button onClick={backToMain} className={`${styles.btn} ${styles.btnBackToMain}`}>
            <span>
              <ArrowBackIosIcon className={styles.iconAdd} />
            </span>
            {t('Back to main')}
          </button>
        </div>
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
              type="password"
              label={t('Password')}
              name="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
              value={formik.values.password}
            />
            <Button
              type="submit"
              color="info"
              variant="outlined"
              disabled={!formik.isValid || !formik.dirty}
              sx={{ marginTop: '10px' }}
            >
              {t('Update')}
            </Button>
            <Button variant="outlined" color="error" sx={{ marginTop: '10px' }} onClick={onToggle}>
              {t('Delete user')}
            </Button>
          </Grid>
        </form>
      </Box>
      <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
    </div>
  );
});
