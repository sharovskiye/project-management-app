import { memo } from 'react';

import { ChangeTitle } from './ChangeTitle';
import { Title } from './Title';
import { useToggle } from '../../../../utils/CustomHook';
import { IColumn } from '../../interface';

import styles from './styles.module.scss';
interface IColumnHeaderProps {
  column: IColumn;
}

export const ColumnHeader = memo(({ column }: IColumnHeaderProps) => {
  const { opened, onToggle } = useToggle();

  return (
    <div className={styles.header}>
      {opened ? (
        <ChangeTitle column={column} openTitleEdit={onToggle} />
      ) : (
        <Title column={column} openTitleEdit={onToggle} />
      )}
    </div>
  );
});
