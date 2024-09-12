// src/components/chain-selector/ChainSelector.tsx

import React, { useState } from 'react';
import styles from './ChainSelector.module.css';

type Chain = 'BTC' | 'ETH' | 'Base' | 'Matic' | 'SOL';

const LegacyChainSelector: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>('ETH');

  const chains: Chain[] = ['BTC', 'ETH', 'Base', 'Matic', 'SOL'];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chain Selector</h2>
      <div className={styles.chainButtons}>
        {chains.map((chain) => (
          <button
            key={chain}
            className={`${styles.chainButton} ${selectedChain === chain ? styles.selected : ''}`}
            onClick={() => setSelectedChain(chain)}
          >
            {chain}
          </button>
        ))}
      </div>
      <p>Selected chain: {selectedChain}</p>
    </div>
  );
};

export default LegacyChainSelector;
