import { Address } from './Address';
import { Block } from './Block';
import { Transaction } from './Transaction';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  miningReward: number;
  rootAddress: Address;
  intervalTime: number;

  constructor(difficulty: number, intervalTime: number) {
    this.difficulty = difficulty;
    this.miningReward = 100;
    this.rootAddress = new Address('0x');
    this.chain = [this.createGenesisBlock()];
    this.intervalTime = intervalTime;
  }

  createGenesisBlock(): Block {
    const genesisTransaction = new Transaction(this.rootAddress, this.rootAddress, 1000, Date.now());
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