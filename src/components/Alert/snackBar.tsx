import { SnackbarProvider } from 'notistack';
import { Alert } from '.';

export const SnackBar = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Alert />
    </SnackbarProvider>
  );
};
