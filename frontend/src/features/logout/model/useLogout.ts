import { useState } from 'react';

import { logout } from '../api/logoutApi';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const refreshToken = tokenStorage.getRefresh();
      if (refreshToken) {
        await logout({ refresh_token: refreshToken });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      tokenStorage.clear();
      setLoading(false);
    }
  };

  return { handleLogout, loading };
};
