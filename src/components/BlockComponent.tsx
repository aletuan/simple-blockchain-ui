import React from 'react';
import { Block } from '../blockchain/Block';
import { truncateHash } from '../utils/truncateHash';

interface BlockProps {
  block: Block;
  index: number;
  isValid: boolean;
}

const BlockComponent: React.FC<BlockProps> = ({ block, index, isValid }) => {
  return (
    <div className={`block ${isValid ? 'valid' : 'invalid'}`}>
      <p><strong>Block {index}</strong></p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Previous Hash: {truncateHash(block.previousHash)}</p>
      <p>Hash: {truncateHash(block.hash)}</p>
      <p>Data: {block.data}</p>
    </div>
  );
};

export default BlockComponent;