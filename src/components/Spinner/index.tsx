import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
  return (
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
  );
};
