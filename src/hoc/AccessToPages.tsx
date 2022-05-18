import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hook';
import { getDataUserSelector } from '../store/selectors';

export const AccessToPages = ({ children }: React.PropsWithChildren<unknown>) => {
  const { token, errorCode, loading } = useAppSelector(getDataUserSelector);

  if (!token || (loading === 'error' && errorCode === '401')) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
