import { useEffect, useRef, useState } from 'react';

import { useToggle } from '../../utils/CustomHook';
import { CustomSelect } from '../Inputs/CustomSelect';
import { DropDownButton } from './DropDownButton';
import { Theme } from './Theme';

import styles from './styles.module.scss';

export const Header = () => {
  const { opened, onToggle } = useToggle();
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const burgerLineStyle = opened ? `${styles.burgerLine} ${styles.open}` : styles.burgerLine;
  const menuContentStyle = opened
    ? `${styles.burgerMenuContent} ${styles.open} ${styles.menuContent}`
    : `${styles.burgerMenuContent} ${styles.menuContent}`;
  const buttonsGroupStyle = opened
    ? `${styles.headerButtonGroup} ${styles.open}`
    : styles.headerButtonGroup;
  useEffect(() => {
    const onBurgerMenu = () => {
      const windowWidth = window.innerWidth;
      if (headerRef.current) {
        const headerWidth = 768;
        if (windowWidth <= headerWidth) {
          headerRef.current.classList.add(styles.burger);
          setIsBurgerMenu(true);
        } else {
          headerRef.current.classList.remove(styles.burger);
          setIsBurgerMenu(false);
        }
      }
    };
    window.addEventListener('resize', onBurgerMenu);
    return () => {
      window.removeEventListener('resize', onBurgerMenu);
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles.containerBig}`}>
      <div className={styles.header}>
        <div ref={headerRef}>
          <div className={buttonsGroupStyle}>
            <div className={styles.burgerMenuLine} onClick={onToggle}>
              <div className={burgerLineStyle}></div>
              <div className={burgerLineStyle}></div>
              <div className={burgerLineStyle}></div>
            </div>
            <div className={menuContentStyle}>
              <DropDownButton isBurger={isBurgerMenu} />
              <div className={styles.headerButton}>
                <a className={isBurgerMenu ? styles.link : styles.outlinedButton}>
                  Create new board
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
      </div>
    </div>
  );
};
