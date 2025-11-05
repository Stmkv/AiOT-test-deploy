import React from 'react';
import { useLogout } from '../model/useLogout';
import { Button } from '@/shared/ui/Button';

interface Props {
  className?: string;
}

export const LogoutButton: React.FC<Props> = ({ className }) => {
  const { handleLogout, loading } = useLogout();

  return (
    <Button
      className={className}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Выход...' : 'Выйти'}
    </Button>
  );
};
