import { ChangeTitle } from './ChangeTitle';
import { Title } from './Title';
import { useToggle } from '../../../../utils/CustomHook';

import styles from './styles.module.scss';

export const ColumnHeader = () => {
  const { opened: isOpenTitleEditOpen, onToggle: openTitleEdit } = useToggle();
  const { opened: isOpenModal, onToggle: openModal } = useToggle();

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
