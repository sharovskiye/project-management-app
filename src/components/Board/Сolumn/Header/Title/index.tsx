import { Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ClassType, CustomButton } from '../../../../Design/Buttons/CustomButton';
import { ConfirmModalWindow } from '../../../../Modal/ConfirmModal';

import styles from './styles.module.scss';

interface IColumnTitleProps {
  openTitleEdit: () => void;
  isOpenModal: boolean;
  openModal: () => void;
  title: string;
}

export const Title = ({ openModal, isOpenModal, openTitleEdit, title }: IColumnTitleProps) => {
  return (
    <>
      <Tooltip title="Change title" placement="top">
        <div className={`${styles.title}`} onClick={openTitleEdit}>
          <p>{title}</p>
        </div>
      </Tooltip>
      <Tooltip title="Delete column" placement="top">
        <div>
          <CustomButton
            icon={<ClearOutlinedIcon />}
            itemType="button"
            classType={ClassType.cancel}
            onClick={openModal}
          />
        </div>
      </Tooltip>
      <ConfirmModalWindow open={isOpenModal} handleClose={openModal} />
    </>
  );
};
