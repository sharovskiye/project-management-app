import { memo } from 'react';
import Modal from '@mui/material/Modal/Modal';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export type ConfirmModalType = {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
};

export const ConfirmModalWindow = memo(({ open, handleClose, onDelete }: ConfirmModalType) => {
  const { t } = useTranslation();

  const onClickBtnDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Modal open={open}>
      <div className={`${styles.modal}`}>
        <div className={styles.title}>
          <div className={styles.textContent}>{t('Confirm deletion')}</div>
        </div>
        <div className={styles.textContent}>{t('Cancellation is not possible')}</div>

        <div className={styles.buttons}>
          <button onClick={onClickBtnDelete} className={`${styles.btn} ${styles.btnDelete}`}>
            {t('Delete')}
          </button>
          <button onClick={handleClose} className={`${styles.btn} ${styles.btnCancel}`}>
            {t('Cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
});
