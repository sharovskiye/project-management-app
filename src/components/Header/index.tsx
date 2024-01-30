import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { boardSelector } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleModalVisible } from '../../store/mainBoardSlice';
import { CustomSelect } from '../Inputs/CustomSelect';
import { CreateBoardModal } from '../Modal/CreateBoardModal';
import { useToggle } from '../../utils/CustomHook';
import { DropDownButton } from './DropDownButton';
import { Theme } from './Theme';

import styles from './styles.module.scss';

export const Header = () => {
  const SCREEN_WIDTH = 768;
  const { opened, onToggle } = useToggle();
  const [isBurgerMenu, setIsBurgerMenu] = useState(window.innerWidth <= SCREEN_WIDTH);
  const burgerLineStyle = opened ? `${styles.burgerLine} ${styles.open}` : styles.burgerLine;
  const menuContentStyle = opened
    ? `${styles.burgerMenuContent} ${styles.open} ${styles.menuContent}`
    : `${styles.burgerMenuContent} ${styles.menuContent}`;
  const buttonsGroupStyle = opened
    ? `${styles.headerButtonGroup} ${styles.open}`
    : styles.headerButtonGroup;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { boardId } = useAppSelector(boardSelector);

  const location = useLocation();
  const navigate = useNavigate();

  const createNewBoard = useCallback(() => {
    if (location.pathname === `/boards/${boardId}`) {
      navigate('/main');
    }

    dispatch(toggleModalVisible());
  }, [dispatch, boardId, location, navigate]);

  useEffect(() => {
    const onBurgerMenu = () => {
      const headerCurrentWidth = window.innerWidth;
      headerCurrentWidth <= SCREEN_WIDTH ? setIsBurgerMenu(true) : setIsBurgerMenu(false);
    };

    window.addEventListener('resize', onBurgerMenu);
    return () => {
      window.removeEventListener('resize', onBurgerMenu);
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles.containerBig}`}>
      <div className={styles.header}>
        <div className={isBurgerMenu ? styles.burger : ''}>
          <div className={buttonsGroupStyle}>
            <div className={styles.burgerMenuLine} onClick={onToggle}>
              <div className={burgerLineStyle}></div>
              <div className={burgerLineStyle}></div>
              <div className={burgerLineStyle}></div>
            </div>
            <div className={menuContentStyle}>
              <DropDownButton isBurger={isBurgerMenu} onClose={onToggle} />
              <div className={styles.headerButton}>
                <a
                  className={isBurgerMenu ? styles.link : styles.outlinedButton}
                  onClick={() => {
                    onToggle();
                    createNewBoard();
                  }}
                >
                  {t('Create new board')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerSettingsBlock}>
          <div className={styles.themeWrapper}>
            <Theme />
          </div>
          <div className={styles.selectWrapper}>
            <CustomSelect />
          </div>
        </div>

        <span className={`${styles.line}`}></span>
        <CreateBoardModal />
      </div>
    </div>
  );
};
