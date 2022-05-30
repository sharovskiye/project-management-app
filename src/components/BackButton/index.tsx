import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import styles from './styles.module.scss';

type BackButtonPropsType = {
  title: string;
  backTo: () => void;
};
export const BackButton = ({ backTo, title }: BackButtonPropsType) => {
  return (
    <button onClick={backTo} className={`${styles.btn} ${styles.btnBackToMain}`}>
      <span>
        <ArrowBackIosIcon className={styles.iconAdd} />
      </span>
      {title}
    </button>
  );
};
