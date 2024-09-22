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
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
      </thead>
      <tbody>
        {block.data.map((transaction, idx) => {
          const transactionTimestamp = transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'Invalid timestamp';
          return (
            <tr key={idx}>
              <td>{transaction.fromAddress}</td>
              <td>{transaction.toAddress}</td>
              <td>{transaction.amount}</td>
              <td>{transactionTimestamp}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
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
      <p>Transaction: {formattedData}</p>
    </div>
  );
};

export default BlockComponent;