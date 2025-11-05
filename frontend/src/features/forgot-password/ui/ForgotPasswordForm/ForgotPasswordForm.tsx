import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';

import { useForgotPassword } from '../../model/useForgorPassword';
import { forgotPasswordSchema } from '../../model/schema';
import type { FormValues } from './types';

import styles from './ForgotPasswordForm.module.css';

interface Props {
  onSuccess: () => void;
}

export const ForgotPasswordForm: React.FC<Props> = ({ onSuccess }) => {
  const { handleForgotPassword, loading } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const { success, message } = await handleForgotPassword({ email: data.email });
    if (success) {
      toast.success('Письмо с инструкциями отправлено на вашу почту!');
      onSuccess();
    } else {
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField label='Email' {...register('email')} error={errors.email} />
      <Button
        type='submit'
        disabled={loading || isSubmitting || !isValid}
        className={styles.button}
      >
        {loading || isSubmitting ? '...' : 'Отправить письмо'}
      </Button>
    </form>
  );
};
