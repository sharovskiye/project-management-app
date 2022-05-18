import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { SignContainer } from '../../../../const/SignInUp';
import { useAppDispatch } from '../../../../store/hook';
import { changeSignConteiner } from '../../../../store/signInUpSlice';
import { CustomButton } from '../../../Design/Buttons/CustomButton';
import { ClassType } from '../../../Design/Buttons/CustomButton';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const openSignIn = useCallback(() => {
    dispatch(changeSignConteiner(SignContainer.signIn));
  }, [dispatch]);

  return (
    <Link to="/form">
      <CustomButton textContent="Sign in" classType={ClassType.icon} onClick={openSignIn} />
    </Link>
  );
};
