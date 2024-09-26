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

    miningTransactions(): Transaction[]{
        const numberOfTransactions = Math.floor(Math.random() * this.transactions.length) + 1;
        const shuffledTransactions = this.transactions.sort(() => 0.5 - Math.random());
        const selectedTransactions = shuffledTransactions.slice(0, numberOfTransactions);

        // Remove the selected transactions from the original transactions array
        this.transactions = this.transactions.filter(transaction => !selectedTransactions.includes(transaction));

        return selectedTransactions;
    }
}