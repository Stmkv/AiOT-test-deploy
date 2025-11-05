import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().nonempty('Почта/логин обязателен'),
  password: z.string().nonempty('Пароль обязателен'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
