import { z } from 'zod';

// Кириллица + дефис + апостроф
const cyrillicNameRegex = /^[А-Яа-яЁё' -]+$/;

// Логин: латиница, цифры, _, ., - (без пробелов)
const loginRegex = /^[A-Za-z0-9._-]+$/;

// Email — стандартная проверка
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Пароль — разрешённые спецсимволы и длина
const passwordRegex = /^[A-Za-z0-9~!?@#$%^&*_\-+()[\]{}></\\|"'.:,;]+$/;

// Хелпер: проверка начала/конца на дефис/апостроф
const noEdgeDashOrApostrophe = (v: string) => !/^-|-$|^'|'$/.test(v);

// Хелпер: заглавная буква
const startsWithCapital = (v: string) => /^[А-ЯЁ]/.test(v[0]);

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty('Логин обязателен')
      .min(4, 'Длина логина от 4 до 30 символов')
      .max(30, 'Длина логина от 4 до 30 символов')
      .regex(
        loginRegex,
        'Некорректный формат логина. Допустимы латинские буквы, цифры, "_", ".", "-"'
      )
      .refine(v => !v.startsWith('.') && !v.endsWith('.'), {
        message: 'Точка не может стоять в начале или конце логина',
      }),

    email: z
      .string()
      .nonempty('Email обязателен')
      .regex(
        emailRegex,
        'Некорректный формат Email. Пожалуйста, проверьте написание'
      ),

    firstName: z
      .string()
      .nonempty('Имя обязательно')
      .min(2, 'Имя должно содержать от 2 до 50 символов')
      .max(50, 'Имя должно содержать от 2 до 50 символов')
      .regex(
        cyrillicNameRegex,
        'Имя может содержать только буквы кириллицы, дефис и апостроф'
      )
      .refine(noEdgeDashOrApostrophe, {
        message:
          'Дефис и апостроф не могут располагаться в начале или конце имени',
      })
      .refine(startsWithCapital, {
        message: 'Имя должно начинаться с заглавной буквы',
      }),

    lastName: z
      .string()
      .nonempty('Фамилия обязательна')
      .min(2, 'Фамилия должна содержать от 2 до 50 символов')
      .max(50, 'Фамилия должна содержать от 2 до 50 символов')
      .regex(
        cyrillicNameRegex,
        'Фамилия может содержать только буквы кириллицы, дефис и апостроф'
      )
      .refine(noEdgeDashOrApostrophe, {
        message:
          'Дефис и апостроф не могут располагаться в начале или конце имени',
      })
      .refine(startsWithCapital, {
        message: 'Фамилия должна начинаться с заглавной буквы',
      }),

    middleName: z
      .string()
      .optional()
      .refine(
        v => !v || (v.length >= 2 && v.length <= 50),
        'Отчество должно содержать от 2 до 50 символов'
      )
      .refine(
        v => !v || cyrillicNameRegex.test(v),
        'Отчество может содержать только буквы кириллицы, дефис и апостроф'
      )
      .refine(
        v => !v || noEdgeDashOrApostrophe(v),
        'Дефис и апостроф не могут располагаться в начале или конце имени'
      )
      .refine(
        v => !v || startsWithCapital(v),
        'Отчество должно начинаться с заглавной буквы'
      ),

    password: z
      .string()
      .nonempty('Пароль обязателен')
      .min(12, 'Пароль должен содержать от 12 до 64 символов')
      .max(64, 'Пароль должен содержать от 12 до 64 символов')
      .regex(
        passwordRegex,
        'Некорректный формат пароля. Допустимы латинские буквы, цифры и специальные символы (~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | " \' . , : ;)'
      )
      .refine(v => !v.includes(' '), {
        message: 'Пароль не должен содержать пробелы',
      })
      .refine(v => !v.startsWith('.') && !v.endsWith('.'), {
        message: 'Точка не может стоять в начале или конце пароля',
      }),

    passwordConfirm: z.string().nonempty('Повторите пароль'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
