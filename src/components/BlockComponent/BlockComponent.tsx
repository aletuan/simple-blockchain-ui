import React from 'react';
import { Block } from '../../blockchain/Block';

import { truncateHash } from '../../utils/truncateHash';

import './BlockComponent.css';

interface BlockProps {
  block: Block;
  index: number;
  isValid: boolean;
}

const BlockComponent: React.FC<BlockProps> = ({ block, index, isValid }) => {
  const formattedTimestamp = new Date(block.timestamp).toLocaleString();

  let formattedData: string | JSX.Element;

  if (Array.isArray(block.data)) {
    formattedData = (
      <ul>
        {block.data.map((transaction, idx) => {
          const transactionTimestamp = transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'Invalid timestamp';
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
    <div className={`block ${isValid ? 'valid' : 'invalid'}`}>
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