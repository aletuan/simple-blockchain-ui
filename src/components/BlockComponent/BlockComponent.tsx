import React from 'react';
import { Block } from '../../blockchain/Block';

import { truncateHash } from '../../utils/truncateHash';
import { capitalColors } from '../../utils/capitalColors';

import './BlockComponent.css';

interface BlockProps {
  block: Block;
  index: number;
  isValid: boolean;
}

const BlockComponent: React.FC<BlockProps> = ({ block, index, isValid }) => {
  const formattedTimestamp = new Date(block.timestamp).toLocaleString();
  const backgroundColor = capitalColors[block.data instanceof Array ? block.data[0]?.fromAddress : ''] || '#FFFFFF'; // Default to white if not found

  let formattedData: string | JSX.Element;

  if (Array.isArray(block.data)) {
    formattedData = (
      <ul>
        {block.data.map((transaction, idx) => {
          const transactionTimestamp = transaction.timestamp ? new Date(transaction.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }) : 'Invalid timestamp';
          return (
            <li key={idx}>
              {transaction.fromAddress} : {transaction.toAddress} : {transaction.amount} USD : {transactionTimestamp}
            </li>
          );
        })}
      </ul>
    );
  } else {
    formattedData = <p>{block.data}</p>;
  }

  return (
    <div className={`block ${isValid ? 'valid' : 'invalid'}`} style={{ backgroundColor }}>
      <p><strong>Block {index}</strong></p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Time: {formattedTimestamp}</p>
      <p>Previous Hash: {truncateHash(block.previousHash)}</p>
      <p>Hash: {truncateHash(block.hash)}</p>
      <p>Data: {formattedData}</p>
    </div>
  );
};

export default BlockComponent;