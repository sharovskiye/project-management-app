import { useSnackbar } from 'notistack';

export enum VariantType {
  error = 'error',
  success = 'success',
}

export const Alert = (message: string, isError = true) => {
  const { enqueueSnackbar } = useSnackbar();
  const variant = isError ? VariantType.error : VariantType.success;
  enqueueSnackbar(message, { variant });
};
