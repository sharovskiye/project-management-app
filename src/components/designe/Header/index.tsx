import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { CustomSelect } from '../Inputs/CustomSelect';

import styles from '../styles.module.scss';
import { SwitchTheme } from '../../SwitchTheme';

export const Header = () => {
  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={` ${styles.link}`}>HEADER</div>
      <Link to={''} className={`${styles.headerLink} ${styles.link}`}>
        HEADER LINK
      </Link>
      <Button variant="outlined" className={`${styles.headerButton} ${styles.button}`}>
        Header button
      </Button>
      <SwitchTheme />
      <div className={styles.selectWrapper}>
        <CustomSelect />
      </div>
      <span className={`${styles.line}`}></span>
    </div>
  );
};
