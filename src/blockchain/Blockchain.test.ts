import { Blockchain } from './Blockchain';
import { Block } from './Block';

describe('Blockchain', () => {
  it('should create a genesis block', () => {
    const blockchain = new Blockchain();
    expect(blockchain.chain.length).toBe(1);
    expect(blockchain.chain[0].data).toBe('Genesis Block');
  });

  it('should add a new block', () => {
    const blockchain = new Blockchain();
    const newBlock = new Block(Date.now(), blockchain.getLatestBlock().hash, 'Test Data');
    blockchain.addBlock(newBlock);
    expect(blockchain.chain.length).toBe(2);
    expect(blockchain.chain[1].data).toBe('Test Data');
  });
});