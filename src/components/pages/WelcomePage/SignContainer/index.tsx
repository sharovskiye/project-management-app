import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

import styles from './styles.module.scss';

export const SignContainer = () => {
  return (
    <div className={styles.wrapper}>
      <SignIn />
      <SignUp />
    </div>
  );
};
