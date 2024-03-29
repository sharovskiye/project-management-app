import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../store/hooks';
import { changeSignConteiner } from '../../../../store/signInUpSlice';

import styles from './styles.module.scss';

type IPropsHeaderBtn = {
  link: string;
  name: string;
  signPage?: string;
};

export const HeaderBtn = ({ link, name, signPage }: IPropsHeaderBtn) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const openSign = useCallback(
    (value: string) => {
      dispatch(changeSignConteiner(value));
    },
    [dispatch]
  );

  return (
    <Link to={link} onClick={() => (signPage ? openSign(signPage) : null)}>
      <button className={styles.button}>{t(name)}</button>
    </Link>
  );
};
