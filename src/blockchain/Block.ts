import { SHA256 } from 'crypto-js';
import { Transaction } from './Transaction';

export class Block {
  timestamp: number;
  previousHash: string;
  hash: string;
  data: Transaction[];
  nonce: number;

  constructor(timestamp: number, previousHash: string, data: Transaction[]) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    const blockString = this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    return SHA256(blockString).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0'); // Create a string with 'difficulty' number of zeros
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}