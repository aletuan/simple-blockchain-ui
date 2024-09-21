import React from 'react';
import { Block } from './Block';

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
      <p>Previous Hash: {block.previousHash}</p>
      <p>Hash: {block.hash}</p>
      <p>Data: {block.data}</p>
    </div>
  );
};

export default BlockComponent;