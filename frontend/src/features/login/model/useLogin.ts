import { useState } from 'react';
import { AxiosError } from 'axios';

import { tokenStorage } from '@/shared/lib/tokenStorage';

import { login } from '../api/loginApi';
import type { LoginData } from '../api/loginApi';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      const res = await login(data);
      if (!res.access_token || !res.refresh_token) {
        throw new Error('Некорректный ответ сервера');
      }
      tokenStorage.save(res.access_token, res.refresh_token);
      return { success: true };
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      const detail = error?.response?.data?.detail;
      return { success: false, message: detail };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
