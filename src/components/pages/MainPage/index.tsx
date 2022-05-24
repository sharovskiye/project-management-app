import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthorized } from '../../../store/boardSlice';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchGetFullBoards } from '../../../store/mainBoardSlice';
import { boardSelector } from '../../../store/selectors';
import { getTokenWithLocalStorage } from '../../../store/signInUpSlice';
import { Header } from '../../Design/Header';
import { CreateBoardModal } from '../../Modal/CreateBoardModal';

import styles from './styles.module.scss';

export const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { modal, boardCollection } = useAppSelector(boardSelector);

  const handleSubmit = useCallback(
    (id: string) => {
      navigate(`/boards/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(fetchGetFullBoards());
  }, [dispatch]);

  const boards = useMemo(() => {
    return boardCollection.map(({ id, title, description }) => {
      return (
        <a key={id} className={styles.boardContainer} onClick={() => handleSubmit(id)}>
          <div className={styles.boardContainerTitle}>
            <h4 className={styles.title}>{title}</h4>
            <button className={styles.delete}>✖</button>
          </div>
          <div className={styles.wrapperSubtitle}>
            <p className={styles.boardContainerSubtitle}>{description}</p>
          </div>
        </a>
      );
    });
  }, [boardCollection]);

  const logOut = useCallback(() => {
    localStorage.clear();
    dispatch(setAuthorized(false));
    dispatch(getTokenWithLocalStorage(''));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.boardsContainer}>{boardCollection.length > 0 && boards}</div>
          {modal && <CreateBoardModal />}
        </div>
      </main>
    </>
  );
};
