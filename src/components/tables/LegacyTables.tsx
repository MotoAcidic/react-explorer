// src/components/tables/Tables.tsx

import React from 'react';
import styles from './Tables.module.css';

const LegacyTables: React.FC = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>30</td>
            <td>New York</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>25</td>
            <td>London</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LegacyTables;
