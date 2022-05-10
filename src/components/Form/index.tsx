import { Footer } from '../Footer';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const Form = () => {
  return (
    <>
      <SignUpForm />
      <SignInForm />
      <Footer />
    </>
  );
};
