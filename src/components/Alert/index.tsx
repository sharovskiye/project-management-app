import { useCallback } from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import styles from './styles.module.scss';

const buttons = [
  { variant: 'success', message: 'Successfully done the operation.' },
  { variant: 'error', message: 'Something went wrong.' },
  { variant: 'warning', message: 'Something could go wrong.' },
];

export const Alert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (button: any) => () => {
      enqueueSnackbar(button.message, { variant: button.variant });
    },
    [enqueueSnackbar]
  );

  return (
    <div className={styles.wrapper}>
      {buttons.map((button) => (
        <Button
          key={button.variant}
          variant="outlined"
          className={`${styles.button} ${`${styles}.${button.variant}`}`}
          onClick={handleClick(button)}
        >
          {button.variant}
        </Button>
      ))}
    </div>
  );
};
