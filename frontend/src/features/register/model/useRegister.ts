import { useState } from 'react';
import { AxiosError } from 'axios';

import { register } from '../api/registerApi';
import type { RegisterData } from '../api/registerApi';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    try {
      await register(data);
      return { success: true };
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>
      const detail = error?.response?.data?.detail;
      return { success: false, message: detail };
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};
