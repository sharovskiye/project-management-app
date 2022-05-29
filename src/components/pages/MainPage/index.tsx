import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setIdDeletedBoard,
  fetchDeleteBoard,
  fetchGetFullBoards,
  setChangeBoard,
  toggleModalVisible,
} from '../../../store/mainBoardSlice';
import { mainBoardSelector } from '../../../store/selectors';
import { useToggle } from '../../../utils/CustomHook';
import { getMessage } from '../../../utils/getMessage';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { Spinner } from '../../Spinner';

import styles from './styles.module.scss';

export const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { opened, onToggle } = useToggle();

  const { boardCollection, loading, idDeletedBoard, errorMessage } =
    useAppSelector(mainBoardSelector);

  useEffect(() => {
    if (loading === 'error') {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [loading, enqueueSnackbar, errorMessage]);

  const onOpened = useCallback(
    (id: string) => {
      navigate(`/boards/${id}`);
    },
    [navigate]
  );

  const onChange = useCallback(
    (id: string, title: string, description: string) => {
      dispatch(setChangeBoard({ id, title, description }));
      dispatch(toggleModalVisible());
    },
    [dispatch]
  );

  const onDeleted = useCallback(
    (id: string) => {
      dispatch(setIdDeletedBoard(id));
      onToggle();
    },
    [dispatch, onToggle]
  );

  const onDelete = useCallback(() => {
    dispatch(fetchDeleteBoard(idDeletedBoard));
  }, [dispatch, idDeletedBoard]);

  useEffect(() => {
    dispatch(fetchGetFullBoards());
  }, [dispatch]);

  const boards = useMemo(
    () =>
      boardCollection.map(({ id, title, description }) => (
        <div key={id} className={styles.boardContainer}>
          <div className={styles.boardContainerTitle}>
            <h4 className={styles.title} title={title}>
              {t('Board')}: {title}
            </h4>
            <div className={styles.buttonContainer}>
              <button className={`${styles.open} ${styles.btn}`} onClick={() => onOpened(id)}>
                {t('Open')}
              </button>
              <button
                className={`${styles.change} ${styles.btn}`}
                onClick={() => onChange(id, title, description)}
              >
                {t('Change')}
              </button>
              <button className={`${styles.delete} ${styles.btn}`} onClick={() => onDeleted(id)}>
                {t('Delete')}
              </button>
            </div>
          </div>
          <div className={styles.wrapperSubtitle}>
            <p className={styles.boardContainerSubtitle}>{description}</p>
          </div>
        </div>
      )),
    [boardCollection, onOpened, onChange, onDeleted, t]
  );

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.boardsContainer}>{boardCollection.length > 0 && boards}</div>
        <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
        {loading === 'pending' && <Spinner />}
      </div>
    </main>
  );
};
