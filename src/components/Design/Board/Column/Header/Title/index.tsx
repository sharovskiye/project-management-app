import { Tooltip } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import { ConfirmModalWindow } from '../../../../../Modal/ConfirmModal';
import { ClassType, CustomButton } from '../../../../Buttons/CustomButton';

import styles from './styles.module.scss';

type ColumnTitleType = {
  openTitleEdit: () => void;
  // isOpenModal: boolean;
  openModal: () => void;
};

export const Title = ({ openModal, openTitleEdit }: ColumnTitleType) => {
  return (
    <>
      <Tooltip title="Change title" placement="top">
        <div className={`${styles.title}`} onClick={openTitleEdit}>
          <p>I`m title/ Click me</p>
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
      {/* <ConfirmModalWindow open={isOpenModal} handleClose={openModal} /> */}
    </>
  );
};
