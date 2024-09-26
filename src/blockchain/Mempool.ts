import { Transaction } from './Transaction';

// Mempool class for storing transactions
export class Mempool {
    pendingTransactions: Transaction[];

    constructor() {
        this.pendingTransactions = [];
    }

    // Add a transaction to the mempool (pending transactions)
    addTransactions(transactions: Transaction[]) {
        transactions.forEach(transaction => {
            if (this.validateTransaction(transaction)) {
                this.pendingTransactions.push(transaction);
            }
        })
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

    // Get all pending transactions (without selective condition)
    //TODO - Selective based on gas effective
    getPendingTransactions(): Transaction[] {
        return this.pendingTransactions;
    }
    
    // Remove transactions that have been mined
    clearMinedTransactions(minedTransactions: Transaction[]) {
        this.pendingTransactions = this.pendingTransactions.filter(tx => !minedTransactions.includes(tx));
    }
    
    // Check if the mempool is empty
    isEmpty(): boolean {
        return this.pendingTransactions.length === 0;
    }
}