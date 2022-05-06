import { Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { CustomButton } from '../Buttons/CustomButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import style from '../style.module.scss';

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
              <CustomButton
                textContent="SUBMIT"
                itemType="submit"
                className={`${style.columnButton} ${style.columnButton__submit}`}
              />
              <CustomButton
                textContent="CANCEL"
                itemType="button"
                className={`${style.columnButton} ${style.columnButton__cancel}`}
                onClick={isOpen}
              />
            </div>
            <input className={style.column_input} type="text" />
          </form>
        )}
      </div>
      <CustomButton
        typeof="button"
        textContent="Add task"
        className={`${style.columnButton} ${style.columnButton__icon}`}
        style={{ height: '37px' }}
        icon={<AddCircleOutlineOutlinedIcon className={style.icon__add} />}
      />
      <div></div>
    </div>
  );
};
