import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

export enum ClassType {
  cancel = 'cancel',
  icon = 'icon',
  submit = 'submit',
}

const getClassNameByClassType = (classType?: ClassType) => {
  switch (classType) {
    case ClassType.cancel:
      return styles.customButtonCancel;

    case ClassType.icon:
      return styles.customButtonIcon;

    case ClassType.submit:
      return styles.customButtonSubmit;

    default:
      return '';
  }
};

export type ButtonProps = {
  textContent?: string;
  icon?: ReactNode;
  classType?: ClassType;
};

type ButtonType = ButtonProps & React.HTMLAttributes<HTMLButtonElement>;

export const CustomButton = ({ textContent, icon, classType, ...rest }: ButtonType) => {
  const classButton = getClassNameByClassType(classType);
  return (
    <button className={`${styles.customButton} ${classButton}`} {...rest}>
      {icon && <span>{icon}</span>}
      {textContent}
    </button>
  );
};
