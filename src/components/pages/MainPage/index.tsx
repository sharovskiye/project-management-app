import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthorized } from '../../../store/boardSlice';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setIdDeletedBoard,
  fetchDeleteBoard,
  fetchGetFullBoards,
} from '../../../store/mainBoardSlice';
import { boardSelector } from '../../../store/selectors';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { useToggle } from '../../../utils/CustomHook';
import { getMessage } from '../../../utils/getMessage';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { CreateBoardModal } from '../../Modal/CreateBoardModal';
import { Spinner } from '../../Spinner';

import styles from './styles.module.scss';

export const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { opened, onToggle } = useToggle();

  const { isModalOpen, boardCollection, loading, idDeletedBoard, errorMessage } =
    useAppSelector(boardSelector);

  useEffect(() => {
    if (loading === 'error') {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [loading, enqueueSnackbar, errorMessage]);

  const handleSubmit = useCallback(
    (id: string) => {
      navigate(`/boards/${id}`);
    },
    [navigate]
  );

  const onChange = useCallback((id: string) => {
    console.log(id);
  }, []);

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
            <h4 className={styles.title}>Board: {title}</h4>
            <div className={styles.buttonContainer}>
              <button className={`${styles.open} ${styles.btn}`} onClick={() => handleSubmit(id)}>
                Open
              </button>
              <button className={`${styles.change} ${styles.btn}`} onClick={() => onChange(id)}>
                Change
              </button>
              <button
                className={`${styles.delete} ${styles.btn}`}
                onClick={() => {
                  dispatch(setIdDeletedBoard(id));
                  onToggle();
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className={styles.wrapperSubtitle}>
            <p className={styles.boardContainerSubtitle}>{description}</p>
          </div>
        </div>
      )),
    [boardCollection, handleSubmit, onChange, dispatch, onToggle]
  );

  const logOut = useCallback(() => {
    localStorage.clear();
    dispatch(setAuthorized(false));
    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.boardsContainer}>{boardCollection[0].id && boards}</div>
          <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
          {loading === 'pending' && <Spinner />}
          {isModalOpen && <CreateBoardModal />}
        </div>
      </main>
    </>
  );
};
