import { Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import style from './style.module.scss';

export const Column = () => {
  const [open, setOpen] = useState(false);

  const isOpen = useCallback(() => {
    setOpen((prevValue) => !prevValue);
  }, []);

  return (
    <div className={`${style.column}`}>
      <div className={`${style.column_header}`}>
        {!open && (
          <Tooltip title="Click">
            <div className={`${style.column_title}`} onClick={isOpen}>
              <p>I`m title/ Click me</p>
            </div>
          </Tooltip>
        )}
        {open && (
          <form className={style.column_form}>
            <div className={style.column_buttons}>
              <button
                type="submit"
                className={`${style.columnButton} ${style.columnButton__submit}`}
              >
                SUBMIT
              </button>
              <button
                type="button"
                className={`${style.columnButton} ${style.columnButton__cancel}`}
                onClick={isOpen}
              >
                CANCEL
              </button>
            </div>
            <input className={style.column_input} type="text" />
          </form>
        )}
      </div>
      <div></div>
    </div>
  );
};
