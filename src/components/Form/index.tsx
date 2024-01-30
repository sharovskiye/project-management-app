import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useAppSelector } from '../../store/hooks';
import { getDataUserSelector } from '../../store/selectors';
import { getMessage } from '../../utils/getMessage';
import { Spinner } from '../Spinner';
import { SignInUpConteiner } from './SignInUpConteiner';

import styles from './styles.module.scss';

export const Form = () => {
  const { loading, errorMessage } = useAppSelector(getDataUserSelector);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loading === 'error') {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [loading, enqueueSnackbar, errorMessage]);

  return (
    <>
      <div className={styles.container}>
        <SignInUpConteiner />
      </div>
      {loading === 'pending' && <Spinner />}
    </>
  );
};
