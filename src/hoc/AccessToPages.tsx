import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { getDataUserSelector } from '../store/selectors';

export const AccessToPages = ({ children }: React.PropsWithChildren<unknown>) => {
  const { token } = useAppSelector(getDataUserSelector);

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
