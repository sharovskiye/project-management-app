import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { SignContainer } from '../../../../const/SignInUp';
import { useAppDispatch } from '../../../../store/hook';
import { changeSignConteiner } from '../../../../store/signInUpSlice';
import { CustomButton } from '../../../Design/Buttons/CustomButton';
import { ClassType } from '../../../Design/Buttons/CustomButton';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const openSignUp = useCallback(() => {
    dispatch(changeSignConteiner(SignContainer.signUp));
  }, [dispatch]);

  return (
    <Link to="/form">
      <CustomButton textContent="Sign up" classType={ClassType.icon} onClick={openSignUp} />
    </Link>
  );
};
