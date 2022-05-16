import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';

import { useAppSelector } from '../../store/hook';
import { getDataUserSelector } from '../../store/selectors';
import { getMessage } from '../../utils/registration';
import { Footer } from '../Design/Footer';
import { Spinner } from '../Spinner';
import { SignInUpConteiner } from './SignInUpConteiner';

import styles from './styles.module.scss';

export const Form = () => {
  const { loading, errorCode } = useAppSelector(getDataUserSelector);

  const { enqueueSnackbar } = useSnackbar();

  const alert = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (loading === 'error') {
      alert(getMessage(errorCode));
    }
  }, [loading, alert, errorCode]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SignInUpConteiner />
      </div>
      {loading === 'pending' && <Spinner />}
      <Footer />
    </div>
  );
};
