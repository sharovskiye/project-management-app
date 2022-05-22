import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { getDataUserSelector } from '../store/selectors';

export const RequireAuth = ({ children }: React.PropsWithChildren<unknown>) => {
  const { token, login } = useAppSelector(getDataUserSelector);

  useEffect(() => {
    if (token) {
      localStorage.setItem('personData', JSON.stringify({ token, login }));
    }
  }, [token, login]);

  if (token) {
    return <Navigate to="/main" />;
  }

  return <>{children}</>;
};
