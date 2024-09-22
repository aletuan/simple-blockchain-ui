import React from 'react';
import { Block } from '../../blockchain/Block';

import { truncateHash } from '../../utils/truncateHash';
import { generateColorFromHash } from '../../utils/generateColorFromHash';

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
            <th>Data</th>
            <th>Time</th>
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
      <p>Block Time: {formattedTimestamp}</p>
      <p>Hash: <span style={{ color: generateColorFromHash(block.hash) }}>{truncateHash(block.hash)}</span></p>
      <p>Previous Hash: <span style={{ color: generateColorFromHash(block.previousHash) }}>{truncateHash(block.previousHash)}</span></p>
      <p>Transaction (Tnx) {formattedData}</p>
    </div>
  );
};

export default BlockComponent;