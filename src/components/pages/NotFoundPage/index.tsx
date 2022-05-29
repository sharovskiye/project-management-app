import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';
import { BackButton } from '../../BackButton';
import { tokenSelector } from '../../../store/selectors';

import styles from './styles.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();

  const backTo = () => {
    token ? navigate('/main') : navigate('/');
  };
  return (
    <div className={styles.notFoundPageWrapper}>
      <div className={styles.notFoundPageContent}>
        <SentimentVeryDissatisfiedIcon className={styles.notFoundPageIcon} />

        <div className={styles.notFoundPageText}>
          <div className={styles.notFoundPageTitle}>404</div>
          <div className={styles.notFoundPageSubtitle}>{t('Page not found')}</div>
          <div>
            <p>{t(`The page are you looking for doesn't exist or an other error occurred.`)}</p>
            <p>{t('Push back button or choose a new direction')}</p>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <BackButton
            title={token ? t('Back to main') : t('Back to welcome page')}
            backTo={backTo}
          />
        </div>
      </div>
    </div>
  );
};
