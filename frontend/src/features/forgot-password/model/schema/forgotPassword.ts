import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('Email обязателен')
    .regex(
      emailRegex,
      'Некорректный формат Email. Пожалуйста, проверьте написание'
    ),
});

export type RegisterFormData = z.infer<typeof forgotPasswordSchema>;
