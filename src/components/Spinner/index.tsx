import { MouseEvent } from 'react';
import { Box, CircularProgress } from '@mui/material';

import styles from './styles.module.scss';

export const Spinner = () => {
  const onClickSpinnerContainer = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div onClick={onClickSpinnerContainer} className={styles.spinnerContainer}>
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 'modal',
        }}
      >
        <CircularProgress size={100} />
      </Box>
    </div>
  );
};
