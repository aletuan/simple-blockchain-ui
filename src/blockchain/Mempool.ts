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

        if (!transaction.fromAddress || !transaction.toAddress) {
            return false
        }

        // Further validation logic can go here (e.g., signature validation, balance check)
        return true;
    }

    // Get all pending transactions (without removing them)
    getPendingTransactions(): Transaction[] {
        return this.transactions;
    }
    
    // Remove transactions that have been mined
    clearMinedTransactions(minedTransactions: Transaction[]) {
        this.transactions = this.transactions.filter(tx => !minedTransactions.includes(tx));
    }
    
    // Check if the mempool is empty
    isEmpty(): boolean {
        return this.transactions.length === 0;
    }
}