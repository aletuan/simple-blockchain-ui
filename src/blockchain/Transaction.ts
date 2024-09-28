import { SHA256 } from 'crypto-js';
import { Address } from './Address';

// Transaction class
export class Transaction {
    fromAddress: Address;
    toAddress: Address;
    amount: number;
    timestamp: number;

    constructor(fromAddress: Address, toAddress: Address, amount: number, timestamp: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    // Simulate generating a hash for this transaction (similar to a transaction ID)
    calculateHash(): string {
        const blockString = this.fromAddress.address + this.toAddress.address + this.amount + this.timestamp
        return SHA256(blockString).toString();
    }
}