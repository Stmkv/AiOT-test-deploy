import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { RegisterModal } from '@/features/register/ui/RegisterModal';
import { LoginModal } from '@/features/login/ui/LoginModal';
import { ForgotPasswordModal } from '@/features/forgot-password/ui/ForgotPasswordModal';

export const LoginButton: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotOpen, setForgotOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setLoginOpen(true)}>Войти</Button>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onRegisterClick={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onForgotClick={() => {
          setLoginOpen(false);
          setForgotOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onLoginClick={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setForgotOpen(false)}
        onLoginClick={() => {
          setForgotOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};
