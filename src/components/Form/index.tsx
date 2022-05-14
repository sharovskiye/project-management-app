import { Alert, Box, CircularProgress } from '@mui/material';

import { useAppSelector } from '../../store/hook';
import { getDataUserSelector } from '../../store/selectors';
import { getMessage } from '../../utils/registration';
import { Footer } from '../Footer';
import { SignInUpConteiner } from './SignInUpConteiner';

export const Form = () => {
  const { loading, errorCode } = useAppSelector(getDataUserSelector);

  return (
    <>
      <SignInUpConteiner />
      {loading === 'error' && <Alert severity="error">{getMessage(errorCode)}</Alert>}
      {loading === 'pending' && (
        <Box
          sx={{
            display: 'flex',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Footer />
    </>
  );
};
