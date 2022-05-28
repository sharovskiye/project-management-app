import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDataUserSelector } from '../store/selectors';
import { getTokenWithLocalStorage } from '../store/signInUpSlice';
import { authorizedSelector } from '../store/usersSlice';

export const AccessToPages = ({ children }: React.PropsWithChildren<unknown>) => {
  const { token } = useAppSelector(getDataUserSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(authorizedSelector);

  useEffect(() => {
    if (!authorized) {
      localStorage.clear();
      dispatch(getTokenWithLocalStorage(''));
      navigate('/');
    }
  }, [authorized, navigate, dispatch]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
