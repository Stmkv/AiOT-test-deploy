import { LoginButton } from '@/features/login/ui/LoginButton';
import { UserMenu } from '@/features/userMenu';
import { useAuthState } from '@/entities/user/model/useAuthState';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { isAuth, loading } = useAuthState();
  if (loading) return null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>AIoT Platform</div>
        {isAuth ? <UserMenu /> : <LoginButton />}
      </div>
    </header>
  );
};
