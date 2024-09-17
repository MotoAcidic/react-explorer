"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './ChainSelector.module.css';
import { Chain } from '../../interfaces/Chain';

interface ChainSelectorProps {
  chainList: Chain[];
  onChainSwitch: (chain: Chain) => void;
  inline?: 'left' | 'right' | 'center';
}

export default function ChainSelector({ chainList, onChainSwitch, inline }: ChainSelectorProps) {
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const validChains = useMemo(() => {
    return chainList.filter(chain => {
      return (
        chain.id &&
        chain.name &&
        chain.icon &&
        chain.network?.name &&
        chain.network?.transactionTypes &&
        chain.nativeCurrency?.symbol &&
        chain.nativeCurrency?.decimals
      );
    });
  }, [chainList]);

  useEffect(() => {
    const savedChain = localStorage.getItem('selectedChain');
    if (savedChain) {
      setSelectedChain(JSON.parse(savedChain));
    } else {
      // Default to the first valid chain
      setSelectedChain(validChains[0]);
    }
    console.log('Selected chain on load:', selectedChain);
  }, [validChains]);

  const handleSelect = (chain: Chain) => {
    setSelectedChain(chain);
    setIsOpen(false);
    localStorage.setItem('selectedChain', JSON.stringify(chain));
    console.log('Selected chain:', chain);
    if (onChainSwitch) {
      onChainSwitch(chain);
    }
  };

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
  }, []);

  const alignmentClass = inline === 'left' ? styles.left : inline === 'right' ? styles.right : styles.center;

  return (
    <div className={`${styles.container} ${alignmentClass}`} ref={dropdownRef}>
      <div
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer' 
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
            {selectedChain.nativeCurrency && (
              <span className={styles['chain-name']}> 
                {`${selectedChain.name} (${selectedChain.nativeCurrency.symbol})`}
              </span>
            )}
          </>
        )}
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {validChains.map((chain) => (
            <li key={chain.id} onClick={() => handleSelect(chain)}>
              <img 
                src={chain.icon} 
                alt={chain.name} 
                style={{ width: '20px', marginRight: '8px' }} 
              />
              <span>{chain.name}</span>
              {chain.nativeCurrency && (
                <span>{` (${chain.nativeCurrency.symbol})`}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
