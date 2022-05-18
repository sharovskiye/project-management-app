import { Button } from '@mui/material';
import { CustomSelect } from '../Inputs/CustomSelect';
import { SwitchTheme } from '../SwitchTheme';

import styles from './styles.module.scss';

type HeaderPropsType = {
  signOut: () => void;
};
export const Header = ({ signOut }: HeaderPropsType) => {
  return (
    <div className={`${styles.container} ${styles.containerBig}  ${styles.header}`}>
      <div className={styles.headerButtonGroup}>
        <Button
          variant="outlined"
          color="inherit"
          className={`${styles.headerButton} ${styles.button}`}
        >
          Edit profile
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          className={`${styles.headerButton} ${styles.button}`}
          onClick={signOut}
        >
          Sign Out
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          className={`${styles.headerButton} ${styles.button}`}
        >
          Create new board
        </Button>
      </div>
      <div className={styles.headerSettingsBlock}>
        <SwitchTheme />
        <div className={styles.selectWrapper}>
          <CustomSelect />
        </div>
      </div>
      <span className={`${styles.line}`}></span>
    </div>
  );
};
