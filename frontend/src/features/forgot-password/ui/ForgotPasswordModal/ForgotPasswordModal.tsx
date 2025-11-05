import React from 'react';
import { Modal } from '@/shared/ui/Modal';
import styles from './ForgotPasswordModal.module.css';
import { ForgotPasswordForm } from '../ForgotPasswordForm/ForgotPasswordForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export const ForgotPasswordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>Восстановление пароля</h3>

      <ForgotPasswordForm onSuccess={onClose} />

      <p className={styles.footer}>
        Вспомнили пароль?{' '}
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            onClose();
            onLoginClick();
          }}
          className={styles.link}
        >
          Войти
        </a>
      </p>
    </Modal>
  );
};
