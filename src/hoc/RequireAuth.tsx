import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hook';
import { getDataUserSelector } from '../store/selectors';

export const RequireAuth = ({ children }: React.PropsWithChildren<unknown>) => {
  const {
    token,
    setUserData: { login, name },
  } = useAppSelector(getDataUserSelector);

  useEffect(() => {
    if (token) {
      localStorage.setItem('personData', JSON.stringify({ token, name, login }));
    }
  }, [login, name, token]);

  if (token) {
    return <Navigate to="/main" />;
  }

  return <>{children}</>;
};
