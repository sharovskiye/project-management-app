import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ClassType, CustomButton } from '../../../../Design/Buttons/CustomButton';

import styles from './styles.module.scss';

interface IChangeTitleProps {
  openTitleEdit: () => void;
  title: string;
}

export const ChangeTitle = ({ openTitleEdit, title }: IChangeTitleProps) => {
  return (
    <form className={styles.form}>
      <div className={styles.buttons}>
        <CustomButton icon={<CheckOutlinedIcon />} itemType="submit" classType={ClassType.submit} />
        <CustomButton
          icon={<ClearOutlinedIcon />}
          itemType="button"
          classType={ClassType.cancel}
          onClick={openTitleEdit}
        />
      </div>
      <input className={styles.input} type="text" value={title} />
    </form>
  );
};
