import bs58 from 'bs58';
import crypto from 'crypto';
import Web3 from 'web3';

import { Chain, Network, SupportedTypes } from '../interfaces/Chain';

// Bitcoin checksum function
const bitcoinChecksum = (address: string): string => {
    try {
        const decoded = bs58.decode(address);
        const versionAndHash = decoded.slice(0, -4);
        const checksum = decoded.subarray(-4);
        const hash = crypto.createHash('sha256').update(versionAndHash).digest();
        const hash2 = crypto.createHash('sha256').update(hash).digest();
        const calculatedChecksum = hash2.subarray(0, 4);

        if (Buffer.compare(checksum, calculatedChecksum) !== 0) {
            throw new Error('Invalid Bitcoin address checksum');
        }

        return address;
    } catch (error) {
        throw new Error('Invalid Bitcoin address');
    }
};

// Solana checksum function
const solanaChecksum = (address: string): string => {
    try {
        const decoded = bs58.decode(address);

        if (decoded.length !== 32) {
            throw new Error('Invalid Solana address length');
        }

        return address;
    } catch (error) {
        throw new Error('Invalid Solana address');
    }
};

// Ethereum checksum function using Web3
const ethereumChecksum = (address: string): string => {
    const web3 = new Web3();

    return web3.utils.toChecksumAddress(address);
};

// Predefined supported transaction types
const BITCOIN_SUPPORTED_TYPES: SupportedTypes[] = [
    "coin_transaction"
];

const EVM_SUPPORTED_TYPES: SupportedTypes[] = [
    "coin_transaction",
    "contract_creation",
    "contract_interaction",
    "token_transfer",
    "token_mint",
    "token_burn",
    "nft_mint",
    "nft_transfer",
    "nft_burn",
    "lp_create",
    "lp_add",
    "lp_remove",
    "domain_register",
];

// Update network definitions
const bitcoinNetwork: Network = {
    name: 'bitcoin',
    transactionTypes: BITCOIN_SUPPORTED_TYPES,
    checksumAddress: bitcoinChecksum,
    supportsSmartContracts: false,
};

const solanaNetwork: Network = {
    name: 'solana',
    transactionTypes: EVM_SUPPORTED_TYPES,
    checksumAddress: solanaChecksum,
    supportsSmartContracts: true,
};

const evmNetwork: Network = {
    name: 'evm',
    transactionTypes: EVM_SUPPORTED_TYPES,
    checksumAddress: ethereumChecksum,
    supportsSmartContracts: true,
};

// Define chains as an object
// Have only verified the Bitcoin chain and Solana chain because im lazy but they work for address and tx hash(TFinch / MotoAcidic)
const chains: Record<string, Chain> = {
  btc: {
    id: 'btc',
    name: 'bitcoin_mainnet',
    network: bitcoinNetwork,
    addressPattern: /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[a-z0-9]{39,59}$/i,
    transactionPattern: /^[a-fA-F0-9]{64}$/,
    blockHashPattern: /^0{4,}[a-fA-F0-9]{60}$/,
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 8,
    },
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035',
  },
  sol: {
    id: 'sol',
    name: 'solana_mainnet',
    network: solanaNetwork,
    addressPattern: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    transactionPattern: /^[1-9A-HJ-NP-Za-km-z]{64,88}$/,
    blockHashPattern: /^[1-9A-HJ-NP-Za-km-z]{43,44}$/, // Solana blockhash pattern EGMKXQpgxivFnrCQ9GiuUJkSWZMJPtihpSgyVK2FDQZD
    nativeCurrency: {
      name: 'Solana',
      symbol: 'SOL',
      decimals: 9,
    },
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
  },
  eth: {
    id: 'eth',
    name: 'ethereum',
    network: evmNetwork,
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    transactionPattern: /^0x[a-fA-F0-9]{64}$/,
    blockHashPattern: /^0x[a-fA-F0-9]{64}$/, // Ethereum block hash pattern
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035',
  },
  base: {
    id: 'base',
    name: 'base_network',
    network: evmNetwork,
    chainId: 8453,
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    transactionPattern: /^0x[a-fA-F0-9]{64}$/,
    blockHashPattern: /^0x[a-fA-F0-9]{64}$/, // Base block hash pattern
    nativeCurrency: {
      name: 'Base',
      symbol: 'ETH',
      decimals: 18,
    },
    icon: 'https://cryptologos.cc/logos/base-coin-base-logo.png?v=035',
  },
  pol: {
    id: 'pol',
    name: 'polygon_matic',
    network: evmNetwork,
    chainId: 137,
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
    transactionPattern: /^0x[a-fA-F0-9]{64}$/,
    blockHashPattern: /^0x[a-fA-F0-9]{64}$/, // Polygon block hash pattern
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'POL',
      decimals: 18,
    },
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=035',
  },
};

  

export { chains };