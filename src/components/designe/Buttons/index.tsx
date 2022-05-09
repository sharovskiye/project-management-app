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
  return (
    <button
      className={
        submit
          ? `${styles.customButton} ${styles.customButton__submit}`
          : cancel
          ? `${styles.customButton} ${styles.customButton__cancel}`
          : icon
          ? `${styles.customButton} ${styles.customButton__icon}`
          : `${styles.customButton}`
      }
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {textContent}
    </button>
  );
};
