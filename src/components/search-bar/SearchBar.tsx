import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Chain } from '../../interfaces/Chain';

interface SearchBarProps {
  selectedChain: Chain;
  inline?: 'left' | 'right' | 'center'; // Optional inline alignment prop
}


const SearchBar: React.FC<SearchBarProps> = ({ selectedChain, inline = 'center' }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
  };

  const validateInput = () => {
    if (!selectedChain) {
      setError('Please select a chain.');
      return;
    }

    const isAddressValid = selectedChain.addressPattern?.test(input);
    const isBlockHeight = /^\d+$/.test(input);
    const isBlockHashValid = selectedChain.blockHashPattern?.test(input);
    const isTransactionValid = selectedChain.transactionPattern?.test(input);

    if (selectedChain.id === 'sol' && isAddressValid && isBlockHashValid) {
      console.log('Solana address or block hash detected for chain:', selectedChain.id);
      setError('');
    } else if (isAddressValid) {
      console.log('Address detected for chain:', selectedChain.id);
      setError('');
    } else if (isBlockHeight) {
      console.log('Block height detected for chain:', selectedChain.id);
      setError('');
    } else if (isBlockHashValid) {
      console.log('Block hash detected for chain:', selectedChain.id);
      setError('');
    } else if (isTransactionValid) {
      console.log('Transaction detected for chain:', selectedChain.id);
      setError('');
    } else {
      setError('Input does not match any known format.');
    }
  };

  // Class for the input based on the inline prop (left, right, center)
  const inputClass =
    inline === 'left' ? styles.inputLeftFlat : inline === 'right' ? styles.inputRightFlat : styles.inputRounded;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {inline === 'right' && <button type="submit" className={styles.button}>Search</button>} {/* Button on left */}
        <input
          type="text"
          placeholder="Enter address, transaction hash..."
          value={input}
          onChange={handleInputChange}
          className={inputClass} // Apply flat or rounded based on inline prop
        />
        {inline !== 'right' && <button type="submit" className={styles.button}>Search</button>} {/* Button on right */}
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default SearchBar;

