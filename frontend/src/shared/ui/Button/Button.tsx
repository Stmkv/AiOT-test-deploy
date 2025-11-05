import styles from './Button.module.css';
import React from 'react';
import cn from 'classnames';
import type { ButtonProps } from './Button.props';

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={cn(styles.button, className)}>
      {children}
    </button>
  );
};
