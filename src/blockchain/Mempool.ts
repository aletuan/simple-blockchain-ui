import { Transaction } from './Transaction';

// Mempool class for storing transactions
export class Mempool {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    // Add a transaction to the mempool
    addTransaction(transaction: Transaction) {
        if (this.validateTransaction(transaction)) {
            this.transactions.push(transaction);
            console.log(`Transaction added: ${transaction.calculateHash()}`);
        } else {
            console.log('Transaction is invalid.');
        }
    }

    // Simulate transaction validation (e.g., signature check, sufficient balance, etc.)
    validateTransaction(transaction: Transaction): boolean {
        // For simplicity, assume all transactions are valid if amount is greater than 0
        if (transaction.amount <= 0) {
            return false;
        }
        // Further validation logic can go here (e.g., signature validation, balance check)
        return true;
    }

    // Get all transactions in the mempool
    getTransactions(): Transaction[] {
        return this.transactions;
    }
}