import React from 'react';
import { Modal } from '@/shared/ui/Modal';
import { RegisterForm } from '@/features/register/ui/RegisterForm';
import styles from './RegisterModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export const RegisterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>Регистрация</h3>

      <RegisterForm onSuccess={onClose} />

      <p className={styles.footer}>
        Уже есть аккаунт?{' '}
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
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
