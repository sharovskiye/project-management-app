import React, { ReactNode } from 'react';

export type ButtonProps = {
  textContent?: string;
  icon?: ReactNode;
};
type ButtonType = ButtonProps & React.HTMLAttributes<HTMLButtonElement>;

export const CustomButton = ({ textContent, icon, ...rest }: ButtonType) => {
  return (
    <button {...rest}>
      {icon && <span>{icon}</span>}
      {textContent}
    </button>
  );
};
