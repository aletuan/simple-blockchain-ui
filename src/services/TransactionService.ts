import { Transaction } from "../blockchain/Transaction";

export class TransactionService {
    private transactions: Transaction[] = [];

    constructor(intervalTime: number = 1000) {
        this.autoGenerateTransaction(intervalTime);
    }

    private autoGenerateTransaction(intervalTime: number) {
        setInterval(() => {
        const newTransaction = new Transaction(
            `User${Math.floor(Math.random() * 100)}`,
            `User${Math.floor(Math.random() * 100)}`,
            Math.floor(Math.random() * 100),
            Date.now()
        );
        this.transactions.push(newTransaction);
        }, intervalTime);
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    getTransactionCount(): number {
        return this.transactions.length;
    }

    isTransactionNotAvailable(): boolean {
        return this.transactions.length === 0;
    }

    miningTransaction(): Transaction | null {
        if (this.transactions.length === 0) {
          return null;
        }
        const randomIndex = Math.floor(Math.random() * this.transactions.length);
        const transaction = this.transactions[randomIndex];
        this.transactions.splice(randomIndex, 1); // Remove the transaction from the list
        return transaction;
    }
}