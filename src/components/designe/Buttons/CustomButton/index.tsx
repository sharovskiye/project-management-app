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
  const classButton = submit
    ? styles.customButtonSubmit
    : cancel
    ? styles.customButtonCancel
    : icon
    ? styles.customButtonIcon
    : null;

  return (
    <button className={`${styles.customButton} ${classButton}`} {...rest}>
      {icon && <span>{icon}</span>}
      {textContent}
    </button>
  );
};
