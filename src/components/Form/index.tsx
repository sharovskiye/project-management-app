import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../store/hook';
import { getDataUserSelector } from '../../store/selectors';
import { getMessage } from '../../utils/registration';
import { Footer } from '../Design/Footer';
import { Spinner } from '../Spinner';
import { SignInUpConteiner } from './SignInUpConteiner';

import styles from './styles.module.scss';

export enum VariantType {
  error = 'error',
  success = 'success',
}

export const Form = () => {
  const { loading, errorCode } = useAppSelector(getDataUserSelector);

  const isError = loading === 'error' ? true : false;

  const { enqueueSnackbar } = useSnackbar();

  const alert = useCallback(
    (message: string, isError = true) => {
      const variant = isError ? VariantType.error : VariantType.success;
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (isError) {
      alert(getMessage(errorCode));
    }
  }, [isError, alert, errorCode]);

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
