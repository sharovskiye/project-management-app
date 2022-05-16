import { ChangeTitle } from './ChangeTitle';
import { Title } from './Title';
import { useToggle } from '../../../../utils/CustomHook';

import styles from './styles.module.scss';
import { memo } from 'react';
import { IColumn } from '../../interface';

interface IColumnHeaderProps {
  column: IColumn;
}

export const ColumnHeader = memo(({ column }: IColumnHeaderProps) => {
  const { opened: isOpenTitleEditOpen, onToggle: openTitleEdit } = useToggle();
  const { opened: isOpenModal, onToggle: openModal } = useToggle();

  return (
    <div className={styles.header}>
      {isOpenTitleEditOpen ? (
        <ChangeTitle column={column} openTitleEdit={openTitleEdit} />
      ) : (
        <Title
          title={column.title}
          openTitleEdit={openTitleEdit}
          isOpenModal={isOpenModal}
          openModal={openModal}
        />
      )}
    </div>
  );
});
