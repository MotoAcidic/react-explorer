import { Block } from "./Block";
import { SupportedTypes } from "./Chain";

export type CoinTransaction = {
    to: string;
    from: string;
    amount: string;
};

export type TokenTransfer = {
    to: string;
    from: string;
    amount: string;
    tokenAddress: string;
    tokenSymbol: string;
};

export type TokenMint = {
    to: string;
    amount: string;
    tokenAddress: string;
    tokenSymbol: string;
};

export type TokenBurn = {
    from: string;
    amount: string;
    tokenAddress: string;
    tokenSymbol: string;
};

export type Swap = {
    from: string;
    to: string;
    amountIn: string;
    amountOut: string;
    tokenInAddress: string;
    tokenOutAddress: string;
    tokenInSymbol: string;
    tokenOutSymbol: string;
};

export type ContractInteraction = {
    from: string;
    to: string;
    contractAddress: string;
    methodName: string;
    params: Record<string, unknown>;
};

export type LPCreate = {
    creator: string;
    token0Address: string;
    token1Address: string;
    token0Amount: string;
    token1Amount: string;
    lpTokenAddress: string;
};

export type LPAdd = {
    provider: string;
    token0Address: string;
    token1Address: string;
    token0Amount: string;
    token1Amount: string;
    lpTokenAmount: string;
};

export type LPRemove = {
    provider: string;
    token0Address: string;
    token1Address: string;
    token0Amount: string;
    token1Amount: string;
    lpTokenAmount: string;
};

export type DomainRegister = {
    registrant: string;
    domainName: string;
    registrationPeriod: string;
    fees: string;
};

export type NFTMint = {
    to: string;
    tokenId: string;
    contractAddress: string;
    collectionName: string;
};

export type NFTTransfer = {
    from: string;
    to: string;
    tokenId: string;
    contractAddress: string;
    collectionName: string;
};

export type NFTBurn = {
    from: string;
    tokenId: string;
    contractAddress: string;
    collectionName: string;
};

export type Transaction = {
    chain: string;
    fees: number;
    block: Block;
    signer: string;
    hash: string;
    type: SupportedTypes;
    data:
    | CoinTransaction
    | TokenTransfer
    | TokenMint
    | TokenBurn
    | Swap
    | ContractInteraction
    | LPCreate
    | LPAdd
    | LPRemove
    | DomainRegister
    | NFTMint
    | NFTTransfer
    | NFTBurn;
};