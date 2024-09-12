"use client";

import { useState, useEffect, useRef } from 'react';
import supportedNetworks from '../../supportedNetworks.json';
import styles from './ChainSelector.module.css';

interface Chain {
  name: string;
  icon: string;
  ticker: string;
}

export default function ChainSelector({ inline }: { inline?: 'left' | 'right' }) {
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved chain from local storage
  useEffect(() => {
    const savedChain = localStorage.getItem('selectedChain');
    if (savedChain) {
      setSelectedChain(JSON.parse(savedChain));
    } else {
      setSelectedChain(supportedNetworks[0].chain);
    }
  }, []);

  const handleSelect = (network: Chain) => {
    setSelectedChain(network);
    setIsOpen(false);
    localStorage.setItem('selectedChain', JSON.stringify(network));
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Allow left or right alignment, defaults to center if nothing is assigned
  const alignmentClass =
    inline === 'left' ? styles.left : inline === 'right' ? styles.right : styles.center;

  return (
    <div className={`${styles.container} ${alignmentClass}`} ref={dropdownRef}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedChain && (
          <>
            <img
              src={selectedChain.icon}
              alt={selectedChain.name}
              style={{ width: '20px', marginRight: '8px' }}
            />
            <span className={styles['chain-name']}>{`${selectedChain.name} (${selectedChain.ticker})`}</span>
          </>
        )}
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {supportedNetworks.map((network) => (
            <li
              key={network.chain.name}
              onClick={() => handleSelect(network.chain)}
            >
              <img
                src={network.chain.icon}
                alt={network.chain.name}
                style={{ width: '20px', marginRight: '8px' }}
              />
              <span className={styles['chain-name']}>{`${network.chain.name} (${network.chain.ticker})`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
