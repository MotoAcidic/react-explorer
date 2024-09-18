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
      console.log('No chain selected.');
      return;
    }
  
    const isAddressValid = selectedChain.addressPattern?.test(input);
    const isBlockHeight = /^\d+$/.test(input);
    const isBlockHashValid = selectedChain.blockHashPattern?.test(input);
    const isTransactionValid = selectedChain.transactionPattern?.test(input);
  
    console.log(`Selected Chain: ${selectedChain.name} (${selectedChain.nativeCurrency.symbol})`);
    console.log(`Validating input: "${input}" for chain: ${selectedChain.name}`);
    console.log(`Address Pattern: ${selectedChain.addressPattern}`);
    console.log(`Transaction Pattern: ${selectedChain.transactionPattern}`);
    console.log(`Block Hash Pattern: ${selectedChain.blockHashPattern}`);
  
    if (selectedChain.id === 'sol' && isAddressValid && isBlockHashValid) {
      console.log(`Input could be either a valid address or block hash for ${selectedChain.name}.`);
      setError('');
    } else if (isAddressValid) {
      console.log(`Input is a valid address for ${selectedChain.name}.`);
      setError('');
    } else if (isBlockHeight) {
      console.log(`Input is a valid block height for ${selectedChain.name}.`);
      setError('');
    } else if (isBlockHashValid) {
      console.log(`Input is a valid block hash for ${selectedChain.name}.`);
      setError('');
    } else if (isTransactionValid) {
      console.log(`Input is a valid transaction hash for ${selectedChain.name}.`);
      setError('');
    } else {
      console.log(`Input does not match any known format for ${selectedChain.name}.`);
      setError('Input does not match the selected network’s address, transaction hash, block hash, or block height format.');
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

