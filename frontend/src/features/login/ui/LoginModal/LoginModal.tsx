import React from 'react';

import { Modal } from '@/shared/ui/Modal';

import { LoginForm } from '../LoginForm/LoginForm';
import styles from './LoginModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onForgotClick: () => void;
}

export const LoginModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRegisterClick,
  onForgotClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>Войти</h3>

      <LoginForm onSuccess={onClose} />

      <p className={styles.footer}>
        Нет аккаунта?{' '}
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            onRegisterClick();
          }}
          className={styles.link}
        >
          Зарегистрироваться
        </a>
      </p>
      <p className={styles.footer}>
        Забыли пароль?{' '}
        <a
          href='#'
          onClick={e => {
            e.preventDefault();
            onForgotClick();
          }}
          className={styles.link}
        >
          Восстановить
        </a>
      </p>
    </Modal>
  );
};
