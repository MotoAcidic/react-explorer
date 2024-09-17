import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Chain } from '../../interfaces/Chain';

interface SearchBarProps {
  selectedChain: Chain;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedChain }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  const validateInput = () => {
    if (!selectedChain) {
      setError('Please select a chain.');
      return;
    }
  
    console.log(`Validating input: "${input}" for chain: ${selectedChain.name}`);
    console.log(`Address Pattern: ${selectedChain.addressPattern}`);
    console.log(`Transaction Pattern: ${selectedChain.transactionPattern}`);
    console.log(`Block Hash Pattern: ${selectedChain.blockHashPattern}`);
  
    const isAddressValid = selectedChain.addressPattern?.test(input);
    const isBlockHeight = /^\d+$/.test(input);
    const isBlockHashValid = selectedChain.blockHashPattern?.test(input);
    const isTransactionValid = selectedChain.transactionPattern?.test(input);
  
    // At the start we add all networks where the address and the block hash look the same in regex 
    // Stupid i know but it works for now (TFinch / MotoAcidic)
    if (selectedChain.id === 'sol' && isAddressValid && isBlockHashValid) {
      console.log(`Input could be either a valid address or a blockhash for ${selectedChain.name}.`);
      setError('');
      // Decide how you want to handle this case in your application logic
    } else if (isAddressValid) {
      console.log('Input is a valid address.');
      setError('');
      // Proceed with address search logic
    } else if (isBlockHeight) {
      console.log('Input is a valid block height.');
      setError('');
      // Proceed with block height search logic
    } else if (isBlockHashValid) {
      console.log('Input is a valid block hash.');
      setError('');
      // Proceed with block hash search logic
    } else if (isTransactionValid) {
      console.log('Input is a valid transaction hash.');
      setError('');
      // Proceed with transaction search logic
    } else {
      console.log('Input does not match any known format.');
      setError('Input does not match the selected network’s address, transaction hash, block hash, or block height format.');
    }
  };
  
  
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter address, transaction hash..."
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
