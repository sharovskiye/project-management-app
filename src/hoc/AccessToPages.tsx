import React from 'react';
import { Navigate } from 'react-router-dom';
import { boardSelector } from '../store/boardSlice';

import { useAppSelector } from '../store/hooks';
import { getDataUserSelector } from '../store/selectors';

export const AccessToPages = ({ children }: React.PropsWithChildren<unknown>) => {
  const { token } = useAppSelector(getDataUserSelector);

  const { is404 } = useAppSelector(boardSelector);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (is404) {
    return <Navigate to="*" />;
  }

  return <>{children}</>;
};
