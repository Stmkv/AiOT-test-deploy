import React from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { useLogin } from '../../model/useLogin';
import { loginSchema } from '@/features/login/model/schema/login';
import type { FormValues } from './types';

import styles from './LoginForm.module.css';

interface Props {
  onSuccess: () => void;
}

export const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { handleLogin, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const { success, message } = await handleLogin({
      username: data.login,
      password: data.password,
    });
    if (success) {
      toast.success('Вы успешно вошли в аккаунт!');
      onSuccess();
    } else {
      toast.error(message ?? "Что-то пошло не так...");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField
        label='Логин/Почта'
        {...register('login')}
        error={errors.login}
      />
      <FormField
        label='Пароль'
        {...register('password')}
        error={errors.password}
        type='password'
      />
      <Button
        type='submit'
        disabled={loading || isSubmitting || !isValid}
        className={styles.button}
      >
        {loading || isSubmitting ? '...' : 'Войти'}
      </Button>
    </form>
  );
};
