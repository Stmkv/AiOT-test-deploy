import React, { useState } from 'react';

import { LogoutButton } from '@/features/logout';
import styles from './UserMenu.module.css';

export const UserMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.menuWrapper}>
      <button
        className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label='Открыть меню'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.dropdown} ${menuOpen ? styles.open : ''}`}>
        <LogoutButton className={styles.menuItem} />
      </div>
    </div>
  );
};
