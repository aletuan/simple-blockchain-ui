import React from 'react';
import { Block } from '../blockchain/Block';
import { truncateHash } from '../utils/truncateHash';
import { capitalColors } from '../utils/capitalColors';
import './BlockComponent.css'; // Import the CSS file

interface BlockProps {
  block: Block;
  index: number;
  isValid: boolean;
}

const BlockComponent: React.FC<BlockProps> = ({ block, index, isValid }) => {
  const formattedTimestamp = new Date(block.timestamp).toLocaleString();
  const backgroundColor = capitalColors[block.data] || '#FFFFFF'; // Default to white if not found

  return (
    <div className={`block ${isValid ? 'valid' : 'invalid'}`} style={{ backgroundColor }}>
      <p><strong>Block {index}</strong></p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Formatted time: {formattedTimestamp}</p>
      <p>Previous Hash: {truncateHash(block.previousHash)}</p>
      <p>Hash: {truncateHash(block.hash)}</p>
      <p>Data: {block.data}</p>
    </div>
  );
};

export default BlockComponent;