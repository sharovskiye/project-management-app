import { useCallback, useEffect, useState } from 'react';
import { CustomButton } from '../../Buttons';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import styles from './styles.module.scss';
import commonStyle from '../../styles.module.scss';
import { ModalWindow } from '../../Modal';
import { ColumnHeader } from './Header';
import { TaskCard } from '../TaskCard';

export const Column = () => {
  const [height, setHeight] = useState(0);
  const [scroll, setScroll] = useState(false);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setHeight(node?.getBoundingClientRect().height);
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const heightColumnPercent = 0.74;
    const bodyHeight = window.innerHeight * heightColumnPercent;

    bodyHeight < height ? setScroll(true) : setScroll(false);
  }, [height]);

  return (
    <div className={`${styles.column} ${commonStyle.column}`}>
      <div className={styles.stickyHeader}>
        <ColumnHeader />
      </div>

      <div ref={ref} className={scroll ? `${styles.taskList__scroll}` : `${styles.taskList}`}>
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
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      <div>
        <CustomButton
          typeof="button"
          textContent="Add task"
          style={{ height: '37px' }}
          icon={<AddCircleOutlineOutlinedIcon className={styles.icon__add} />}
          onClick={handleOpen}
        />

        <ModalWindow
          child={
            <textarea
              className={styles.modal_input}
              placeholder="Enter a title for this task"
              style={{ height: '100%', width: '100%' }}
            ></textarea>
          }
          open={openModal}
          handleClose={handleClose}
          nameButton="Add task"
        />
      </div>
    </div>
  );
};
