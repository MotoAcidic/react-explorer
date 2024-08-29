// src/components/top-navbar/TopNavbar.tsx

import React from 'react';
import styles from './TopNavbar.module.css';

const LegacyTopNavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.item}>Home</li>
          <li className={styles.item}>Services</li>
          <li className={styles.item}>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default LegacyTopNavBar;
