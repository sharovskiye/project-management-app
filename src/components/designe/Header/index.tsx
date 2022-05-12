import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { CustomSelect } from '../Inputs/CustomSelect';

import styles from '../styles.module.scss';

export const Header = () => {
  return (
    <div className={`${styles.container} ${styles.container__big}  ${styles.header}`}>
      <div className={` ${styles.link}`}>HEADER</div>
      <Link to={''} className={`${styles.header_link} ${styles.link}`}>
        HEADER LINK
      </Link>
      <Button variant="outlined" className={`${styles.header_button} ${styles.button}`}>
        Header button
      </Button>
      <div className={styles.selectWrapper}>
        <CustomSelect />
      </div>
      <span className={`${styles.line}`}></span>
    </div>
  );
};
