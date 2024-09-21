import { SHA256 } from 'crypto-js';

// Transaction class
export class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    timestamp: number | undefined;

    constructor(fromAddress: string, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    // Simulate generating a hash for this transaction (similar to a transaction ID)
    calculateHash(): string {
        const blockString = this.fromAddress + this.toAddress + this.amount + this.timestamp
        return SHA256(blockString).toString();
    }
}