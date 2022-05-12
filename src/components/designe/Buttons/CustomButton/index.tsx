import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

export type ButtonProps = {
  textContent?: string;
  icon?: ReactNode;
  submit?: boolean;
  cancel?: boolean;
};
type ButtonType = ButtonProps & React.HTMLAttributes<HTMLButtonElement>;

export const CustomButton = ({ textContent, icon, submit, cancel, ...rest }: ButtonType) => {
  const classSubmit = submit ? styles.customButton__submit : null;
  const classCancel = cancel ? styles.customButton__cancel : null;
  const classIcon = icon ? styles.customButton__icon : null;

  return (
    <button
      className={`${styles.customButton} ${classSubmit} ${classCancel} ${classIcon}`}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {textContent}
    </button>
  );
};
