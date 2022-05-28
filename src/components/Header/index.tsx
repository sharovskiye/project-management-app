import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useToggle } from '../../utils/CustomHook';

import { CustomSelect } from '../Inputs/CustomSelect';
import { DropDownButton } from './DropDownButton';

import styles from './styles.module.scss';
import { Theme } from './Theme';

export const Header = () => {
  const { opened, onToggle } = useToggle();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isBurgerMenu = () => {
      const windowWidth = window.innerWidth;
      if (headerRef.current) {
        const headerWidth = 768;
        windowWidth <= headerWidth
          ? headerRef.current.classList.add(styles.burger)
          : headerRef.current.classList.remove(styles.burger);
      }
    };
    window.addEventListener('resize', isBurgerMenu);
    return () => {
      window.removeEventListener('resize', isBurgerMenu);
    };
  }, []);
  return (
    <div className={`${styles.container} ${styles.containerBig}`}>
      <div className={styles.header}>
        <div ref={headerRef}>
          <div
            className={
              opened ? `${styles.headerButtonGroup} ${styles.open}` : styles.headerButtonGroup
            }
          >
            <div className={styles.burgerMenuLine} onClick={onToggle}>
              <div
                className={opened ? `${styles.burgerLine} ${styles.open}` : styles.burgerLine}
              ></div>
              <div
                className={opened ? `${styles.burgerLine} ${styles.open}` : styles.burgerLine}
              ></div>
              <div
                className={opened ? `${styles.burgerLine} ${styles.open}` : styles.burgerLine}
              ></div>
            </div>
            <div
              className={
                opened
                  ? `${styles.burgerMenuContent} ${styles.open} ${styles.menuContent}`
                  : `${styles.burgerMenuContent} ${styles.menuContent}`
              }
            >
              <DropDownButton isBurger={opened} />
              <div className={styles.headerButton}>
                <a className={opened ? styles.link : styles.outlinedButton}>Create new board</a>
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
