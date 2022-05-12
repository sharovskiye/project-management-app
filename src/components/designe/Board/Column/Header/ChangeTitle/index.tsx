import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { CustomButton } from '../../../../Buttons/CustomButton';

import styles from './styles.module.scss';

type ChangeTitleType = {
  openTitleEdit: () => void;
};
export const ChangeTitle = ({ openTitleEdit }: ChangeTitleType) => {
  return (
    <form className={styles.form}>
      <div className={styles.buttons}>
        <CustomButton icon={<CheckOutlinedIcon />} itemType="submit" submit />
        <CustomButton
          icon={<ClearOutlinedIcon />}
          itemType="button"
          cancel
          onClick={openTitleEdit}
        />
      </div>
      <input className={styles.input} type="text" />
    </form>
  );
};
