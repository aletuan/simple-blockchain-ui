import { Block } from './Block';
import { Transaction } from './Transaction';

import { getRandomTimestamp } from '../utils/getRandomTimestamp';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  miningReward: number;

  constructor(difficulty: number) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    const genesisTransaction = new Transaction("0x", "0x", 1000, getRandomTimestamp());
    return new Block(Date.now(), 'null', [genesisTransaction]);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
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