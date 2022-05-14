import { memo, useEffect, useMemo, useRef, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useToggle } from '../../../utils/CustomHook';
import { IColumn } from '../interface';
import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ClassType, CustomButton } from '../../Design/Buttons/CustomButton';

import styles from './styles.module.scss';
import { ModalInputTitle } from '../../Modal/ModalInputTitle';

interface IColumnProps {
  column: IColumn;
}

export const Column = memo(({ column }: IColumnProps) => {
  const { title, tasks } = column;
  const columnsMemo = useMemo(() => {
    return tasks ? tasks.map((task) => <Task task={task} key={task.id} />) : null;
  }, [tasks]);
  console.log('render');

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
    <div className={styles.column}>
      <div className={styles.stickyHeader}>
        Column: {title}
        <ColumnHeader />
      </div>

      <div ref={refDiv} className={isScroll ? `${styles.taskListScroll}` : `${styles.taskList}`}>
        <div>{columnsMemo}</div>
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
});
