import { Block } from './Block';
import { Mempool } from './Mempool';
import { Transaction } from './Transaction';

import { getRandomTimestamp } from '../utils/getRandomTimestamp';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  mempool: Mempool;
  miningReward: number;

  constructor(difficulty: number, mempool: Mempool) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.mempool = mempool;
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    const genesisTransaction = new Transaction("0x", "0x", 1000, getRandomTimestamp());
    return new Block(Date.now(), '0', [genesisTransaction]);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }


  // Mine the transactions in the mempool into a new block
  minePendingTransactions(miningRewardAddress: string): void {
    if (this.mempool.isEmpty()) {
        console.log('No transactions to mine.');
        return;
    }

    const rewardTx = new Transaction("0x", miningRewardAddress, this.miningReward, getRandomTimestamp());
    this.mempool.addTransaction(rewardTx); // Add mining reward as a transaction

    // Create a new block with the current pending transactions
    const block = new Block(Date.now(), this.getLatestBlock().hash, this.mempool.getPendingTransactions());
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    // Clear the mined transactions from the mempool
    this.mempool.clearMinedTransactions(block.data);
  }  

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}