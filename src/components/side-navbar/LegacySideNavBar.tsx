// src/components/side-navbar/SideNavbar.tsx

import React from 'react';
import styles from './SideNavbar.module.css';

const LegacySideNavBar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.item}>Home</li>
        <li className={styles.item}>About</li>
        <li className={styles.item}>Contact</li>
      </ul>
    </nav>
  );
};

export default LegacySideNavBar;
