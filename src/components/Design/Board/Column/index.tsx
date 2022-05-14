import { useEffect, useRef, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ClassType, CustomButton } from '../../Buttons/CustomButton';
import { ColumnHeader } from './Header';
import { TaskCard } from '../TaskCard';
import { ModalInputTitle } from '../../../Modal/ModalInputTitle';
import { useToggle } from '../../../../utils/CustomHook';

import styles from './styles.module.scss';
import commonStyle from '../../styles.module.scss';

export const Column = () => {
  const [height, setHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const { opened, onToggle } = useToggle();
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      setHeight(refDiv.current?.clientHeight);
    }
  }, [refDiv]);

  useEffect(() => {
    const heightColumnPercent = 0.69;
    const bodyHeight = window.innerHeight * heightColumnPercent;

    setIsScroll(bodyHeight < height);
  }, [height]);

  return (
    <div className={`${styles.column} ${commonStyle.column}`}>
      <div className={styles.stickyHeader}>
        <ColumnHeader />
      </div>

      <div ref={refDiv} className={isScroll ? `${styles.taskListScroll}` : `${styles.taskList}`}>
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
            classType={ClassType.icon}
            icon={<AddCircleOutlineOutlinedIcon className={styles.iconAdd} />}
            onClick={onToggle}
          />
        </div>

        <ModalInputTitle
          placeholder="Enter a title for this task"
          buttonName="Add task"
          open={opened}
          handleClose={onToggle}
        />
      </div>
    </div>
  );
};
