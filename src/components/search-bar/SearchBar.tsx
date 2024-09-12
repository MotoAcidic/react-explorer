// src/components/search-bar/SearchBar.tsx

import React from 'react';
import styles from './SearchBar.module.css';

const LegacySearchBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder="Search..." />
    </div>
  );
};

export default LegacySearchBar;
