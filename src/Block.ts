import { SHA256 } from 'crypto-js';

export class Block {
  timestamp: number;
  previousHash: string;
  hash: string;
  data: string;

  constructor(timestamp: number, previousHash: string, data: string) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    const blockString = this.previousHash + this.timestamp + JSON.stringify(this.data);
    return SHA256(blockString).toString();
  }
}