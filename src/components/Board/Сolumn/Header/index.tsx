import { ChangeTitle } from './ChangeTitle';
import { Title } from './Title';
import { useToggle } from '../../../../utils/CustomHook';

import styles from './styles.module.scss';
import { memo } from 'react';

interface IColumnHeaderProps {
  title: string;
}

export const ColumnHeader = memo(({ title }: IColumnHeaderProps) => {
  const { opened: isOpenTitleEditOpen, onToggle: openTitleEdit } = useToggle();
  const { opened: isOpenModal, onToggle: openModal } = useToggle();

  return (
    <div className={styles.header}>
      {isOpenTitleEditOpen ? (
        <ChangeTitle title={title} openTitleEdit={openTitleEdit} />
      ) : (
        <Title
          title={title}
          openTitleEdit={openTitleEdit}
          isOpenModal={isOpenModal}
          openModal={openModal}
        />
      )}
    </div>
  );
});
