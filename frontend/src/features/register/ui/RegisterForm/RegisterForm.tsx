import React from 'react';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { useRegister } from '../../model/useRegister';
import styles from './RegisterForm.module.css';
import { registerSchema } from '../../model/schema/register';
import type { FormValues } from './types';

interface Props {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
  const { handleRegister, loading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const { success, message } = await handleRegister(data);
    if (success) {
      toast.success('Письмо с подтверждением отправлено на вашу почту!');
      onSuccess();
    } else {
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField
        label='Логин'
        required
        {...register('username')}
        error={errors.username}
      />
      <FormField
        label='Email'
        type='email'
        required
        {...register('email')}
        error={errors.email}
      />
      <FormField
        label='Имя'
        required
        {...register('firstName')}
        error={errors.firstName}
      />
      <FormField
        label='Фамилия'
        required
        {...register('lastName')}
        error={errors.lastName}
      />
      <FormField
        label='Отчество'
        {...register('middleName')}
        error={errors.middleName}
      />
      <FormField
        label='Пароль'
        required
        type='password'
        {...register('password')}
        error={errors.password}
      />
      <FormField
        label='Повторите пароль'
        type='password'
        required
        {...register('passwordConfirm')}
        error={errors.passwordConfirm}
      />
      <Button
        type='submit'
        disabled={loading || isSubmitting || !isValid}
        className={styles.button}
      >
        {loading || isSubmitting ? '...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
