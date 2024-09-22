import { Block } from './Block';
import { Blockchain } from './Blockchain';
import { Transaction } from './Transaction';

// Simulate the miner
export class Miner {
    private blockchain: Blockchain;
    public miningRewardAddress: string;

    constructor(blockchain: Blockchain, miningRewardAddress: string) {
        this.blockchain = blockchain;
        this.miningRewardAddress = miningRewardAddress;
    }

    // "Mine" transactions by taking them out of the mempool and adding them to a block (in a real scenario)
    mineTransactions() {
        const transactionsToMine = this.blockchain.mempool.getPendingTransactions();
        if (transactionsToMine.length === 0) {
            console.log('No transactions to mine.');
        } else {
            console.log(`Mining ${transactionsToMine.length} transactions...`);
            const newBlock = this.createBlock(transactionsToMine);
            newBlock.mineBlock(this.blockchain.difficulty);
            this.blockchain.minePendingTransactions(this.miningRewardAddress);
            console.log(`Block mined: ${newBlock.hash}`);
        }
    }

    private createBlock(transactions: Transaction[]): Block {
        const previousHash = this.blockchain.getLatestBlock().hash;
        const newBlock = new Block(Date.now(), previousHash, transactions);
        return newBlock;
      }
}