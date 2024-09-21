import { Block } from './Block';

export class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor(difficulty: number) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty; // Set the difficulty level
  }

  createGenesisBlock(): Block {
    return new Block(Date.now(), '0', 'Genesis Block');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
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