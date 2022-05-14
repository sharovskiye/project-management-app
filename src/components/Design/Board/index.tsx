import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Column } from './Column';
import { ClassType, CustomButton } from '../Buttons/CustomButton';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';
import { useToggle } from '../../../utils/CustomHook';

import styles from './styles.module.scss';

export const Board = () => {
  const { opened, onToggle } = useToggle();

  return (
    <>
      <div className={styles.boardColumnList}>
        <Column />
      </div>

      <div className={styles.boardNewColumn}>
        <div className={styles.buttonWrapper}>
          <CustomButton
            typeof="button"
            textContent="Add new column"
            classType={ClassType.icon}
            icon={<AddCircleOutlineOutlinedIcon className={styles.iconAdd} />}
            onClick={onToggle}
          />
        </div>

        <ModalInputTitle
          placeholder="Enter a title for the new columns"
          buttonName="Add column"
          open={opened}
          handleClose={onToggle}
        />
      </div>
    </>
  );
};
