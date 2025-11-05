import { api } from '@/shared/lib/axiosInstance';

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  passwordConfirm: string;
}

export const register = async (data: RegisterData) => {
  const payload = {
    username: data.username,
    password: data.password,
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    middle_name: data.middleName,
    password_confirm: data.passwordConfirm,
  };

  const res = await api.post('/auth-service/auth/register', payload);
  return res.data;
};
