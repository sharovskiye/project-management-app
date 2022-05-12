import { useCallback, useState } from 'react';
import { ChangeTitle } from './ChangeTitle';
import { Title } from './Title';

import styles from './styles.module.scss';

export const ColumnHeader = () => {
  const [isOpenTitleEditOpen, setIsOpenTitleEditOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openTitleEdit = useCallback(() => {
    setIsOpenTitleEditOpen((prevValue) => !prevValue);
  }, []);

  const openModal = useCallback(() => {
    setIsOpenModal((prevValue) => !prevValue);
  }, []);

  return (
    <div className={styles.header}>
      {isOpenTitleEditOpen ? (
        <ChangeTitle openTitleEdit={openTitleEdit} />
      ) : (
        <Title openTitleEdit={openTitleEdit} isOpenModal={isOpenModal} openModal={openModal} />
      )}
    </div>
  );
};
