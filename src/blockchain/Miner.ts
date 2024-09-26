import { Block } from './Block';
import { Blockchain } from './Blockchain';
import { Mempool } from './Mempool';
import { Transaction } from './Transaction';
import { getRandomTimestamp } from '../utils/getRandomTimestamp';

// Simulate the miner
export class Miner {
    private blockchain: Blockchain;
    private miningRewardAddress: string;
    private mempool: Mempool

    constructor(blockchain: Blockchain, mempool: Mempool, miningRewardAddress: string) {
        this.blockchain = blockchain;
        this.mempool = mempool;
        this.miningRewardAddress = miningRewardAddress;
    }

    // "Mine" transactions by taking them out of the mempool and adding them to a block (in a real scenario)
    minePendingTransactions(): number {
        const startTime = Date.now();
        if (this.mempool.isEmpty()) {
            console.log('No transactions to mine.');
        } else {;
            const rewardTx: Transaction[] = [
                new Transaction("0x", this.miningRewardAddress, this.blockchain.miningReward, getRandomTimestamp())
            ];
            
            this.mempool.addTransactions(rewardTx);
            
            const transactionsToMine = this.mempool.getPendingTransactions();

            // Start mining a block
            console.log(`Mining ${transactionsToMine.length} transactions...`)
            const newBlock = this.createBlock(transactionsToMine);
            newBlock.mineBlock(this.blockchain.difficulty);
            console.log(`Block mined: ${newBlock.hash}`);
            
            // Add new mined block
            this.blockchain.chain.push(newBlock);

            // Clear the mined transactions from the mempool
            this.mempool.clearMinedTransactions(newBlock.data);
        }

        const endTime = Date.now();
        return (endTime - startTime) / 1000;
    }   

    private createBlock(transactions: Transaction[]): Block {
        const previousHash = this.blockchain.getLatestBlock().hash;
        const newBlock = new Block(Date.now(), previousHash, transactions);
        return newBlock;
      }
}