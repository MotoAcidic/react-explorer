export type Block = {
    hash?: string;
    height?: number;
    timestamp?: number | string;
    transactionCount?: number;
    previousHash?: string;
};