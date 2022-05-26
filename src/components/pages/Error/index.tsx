import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { boardSelector, errorMessageBoardSelector, set404 } from '../../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getMessage } from '../../../utils/getMessage';

export const Error = () => {
  const errorMessage = useAppSelector(errorMessageBoardSelector);

  const { isError } = useAppSelector(boardSelector);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [isError, enqueueSnackbar, errorMessage]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(set404(false));
  }, [dispatch]);

  return <div>Error 404</div>;
};
