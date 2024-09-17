"use client";

import { useState } from 'react';
import ChainSelector from '../../../src/components/chain-selector/ChainSelector';
import SearchBar from '../../../src/components/search-bar/SearchBar';
import { chains } from '../../../src/example/chains';

export default function App() {
  const [selectedChain, setSelectedChain] = useState(chains.btc);

  return (
    <div>
      <ChainSelector chainList={Object.values(chains)} onChainSwitch={setSelectedChain} />
      <SearchBar selectedChain={selectedChain} chains={chains} />
    </div>
  );
}
