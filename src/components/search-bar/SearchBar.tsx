import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ selectedChain }) => {
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
    console.log(`Address Pattern: ${selectedChain.addressPattern}, Type: ${typeof selectedChain.addressPattern}`);
  
    // Check if the input matches address pattern
    if (selectedChain.addressPattern && selectedChain.addressPattern.test(input)) {
      console.log(`Valid address for ${selectedChain.name}`);
      setError('');
    } else {
      console.log('Input does not match the selected network’s format.');
      setError('Input does not match the selected network’s format.');
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
          onChange={handleInputChange}  // Attach the handler here
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
