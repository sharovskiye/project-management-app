import { useCallback, useEffect, useRef, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CustomButton } from '../../Buttons/CustomButton';
import { ColumnHeader } from './Header';
import { TaskCard } from '../TaskCard';
import { ModalInputTitle } from '../../../Modal/ModalInputTitle';

import styles from './styles.module.scss';
import commonStyle from '../../styles.module.scss';

export const Column = () => {
  const [height, setHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      setHeight(refDiv.current?.clientHeight);
    }
  }, [refDiv]);

  const openModal = useCallback(() => {
    setIsOpenModal((prevValue) => !prevValue);
  }, []);

  useEffect(() => {
    const heightColumnPercent = 0.69;
    const bodyHeight = window.innerHeight * heightColumnPercent;

    bodyHeight < height ? setIsScroll(true) : setIsScroll(false);
  }, [height]);

  return (
    <div className={`${styles.column} ${commonStyle.column}`}>
      <div className={styles.stickyHeader}>
        <ColumnHeader />
      </div>

      <div ref={refDiv} className={isScroll ? `${styles.taskList__scroll}` : `${styles.taskList}`}>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      <div>
        <div className={styles.buttonWrapper}>
          <CustomButton
            typeof="button"
            textContent="Add task"
            icon={<AddCircleOutlineOutlinedIcon className={styles.icon__add} />}
            onClick={openModal}
          />
        </div>

        <ModalInputTitle
          placeholder="Enter a title for this task"
          buttonName="Add task"
          open={isOpenModal}
          handleClose={openModal}
        />
      </div>
    </div>
  );
};
