import { useEffect, useState } from 'react';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import { introspect, refresh } from '@/shared/api/auth';

export const useAuthState = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const access = tokenStorage.getAccess();
      const refreshToken = tokenStorage.getRefresh();

      try {
        if (access) {
          const data = await introspect(access);
          if (data.active) {
            setIsAuth(true);
            return;
          }
        }

        if (refreshToken) {
          const newTokens = await refresh(refreshToken);
          tokenStorage.save(newTokens.access_token, newTokens.refresh_token);
          setIsAuth(true);
        } else {
          tokenStorage.clear();
          setIsAuth(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        tokenStorage.clear();
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verify();

    const handler = (e: Event) => {
      const { type } = (e as CustomEvent<{ type: string }>).detail || {};
      if (type === 'login') verify();
      if (type === 'logout') setIsAuth(false);
    };

    window.addEventListener('authChange', handler);
    return () => window.removeEventListener('authChange', handler);
  }, []);

  return { isAuth, loading };
};
