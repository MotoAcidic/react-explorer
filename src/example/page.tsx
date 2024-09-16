import React, { useState } from 'react';
import ChainSelector from "../../../src/components/chain-selector/ChainSelector";
import SearchBar from "../../../src/components/search-bar/SearchBar";
import { chains } from '../../../src/interfaces/chains'; // Example chain data

export default function App() {
  const [selectedChain, setSelectedChain] = useState(chains['eth']); // Default to Ethereum

  const handleChainChange = (chain) => {
    setSelectedChain(chain); // Update the ChainSelector with new chain
  };

  return (
    <div>
      <ChainSelector chainList={Object.values(chains)} selectedChain={selectedChain} />
      <SearchBar chains={chains} onChainChange={handleChainChange} />
    </div>
  );
}
