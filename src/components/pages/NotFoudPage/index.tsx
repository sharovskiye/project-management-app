import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useAppSelector } from '../../../store/hooks';
import { getDataUserSelector } from '../../../store/selectors';
import { BackButton } from '../../BackButton';

import styles from './styles.module.scss';

export const NotFoudPage = () => {
  const { token } = useAppSelector(getDataUserSelector);
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
          <div className={styles.notFoundPageSubtitle}>Page not found</div>
          <div>
            <p>The page are you looking for doesn&apos;t exist or an other error occured.</p>
            <p>Push back button or choose a new direction</p>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <BackButton title={token ? 'Back to main' : 'Back to welcome page'} backTo={backTo} />
        </div>
      </div>
    </div>
  );
};
