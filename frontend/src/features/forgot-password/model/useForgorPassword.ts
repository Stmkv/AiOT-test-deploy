import { useState } from 'react';
import { AxiosError } from "axios"
import { forgotPassword } from '../api/forgotPasswordApi';
import type { forgotPasswordData } from '../api/forgotPasswordApi';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (data: forgotPasswordData) => {
    setLoading(true);
    try {
      await forgotPassword(data);
      return { success: true };
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>
      const detail = error?.response?.data?.detail
      return { success: false, message: detail };
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading };
};
