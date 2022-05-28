import { useAppSelector } from '../../../../store/hooks';
import { HeaderBtn } from '../HeaderBtn';
import { Pages } from '../../../../const/pages';
import { NameBtn } from './const';
import { getDataUserSelector } from '../../../../store/selectors';
import { SignContainerPage } from '../../../../const/pageNumberSign';

import styles from './styles.module.scss';

export const SignContainer = () => {
  const { token } = useAppSelector(getDataUserSelector);
  return (
    <div className={styles.wrapper}>
      {token ? (
        <HeaderBtn name={NameBtn.GoToMain} link={Pages.mainPage} />
      ) : (
        <>
          <HeaderBtn name={NameBtn.SignIn} link={Pages.sign} signPage={SignContainerPage.signIn} />
          <HeaderBtn name={NameBtn.SignUp} link={Pages.sign} signPage={SignContainerPage.signUp} />
        </>
      )}
    </div>
  );
};
