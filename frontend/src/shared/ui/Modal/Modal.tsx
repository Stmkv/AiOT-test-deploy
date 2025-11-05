import React from 'react';
import styles from './Modal.module.css';
import cn from 'classnames';
import type { ModalProps } from './Modal.props';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.modal, className)}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
