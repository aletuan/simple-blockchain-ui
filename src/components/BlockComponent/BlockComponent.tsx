import React from 'react';
import { Block } from '../../blockchain/Block';
import { Link } from 'react-router-dom';

import { truncateHash } from '../../utils/truncateHash';
import { generateColorFromHash } from '../../utils/generateColorFromHash';

import './BlockComponent.css';

interface BlockProps {
  block: Block;
  index: number;
}

const BlockComponent: React.FC<BlockProps> = ({ block, index }) => {
  const formattedTimestamp = new Date(block.timestamp).toLocaleString();

  let transactionData: string | JSX.Element;

  if (Array.isArray(block.data)) {
    transactionData = (
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
        {/* TODO: Adding link to address and to address, each address will get air-drop 1000 token as incentive */}
        {block.data.map((transaction, idx) => {
          const transactionTimestamp = transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'Invalid timestamp';
          return (
            <tr key={idx}>
              <td>
                <Link 
                  to='/address'
                  state={{ 
                    address: transaction.fromAddress.address, 
                    balance: transaction.fromAddress.balance, 
                    alias: transaction.fromAddress.alias 
                  }}
                  className="address-link"
                >
                  {transaction.fromAddress.alias}
                </Link>
              </td>
              <td>
                <Link 
                  to='/address'
                  state={{ 
                    address: transaction.toAddress.address, 
                    balance: transaction.toAddress.balance, 
                    alias: transaction.toAddress.alias 
                  }}
                  className="address-link"
                >
                  {transaction.toAddress.alias}
                </Link>
              </td>
              <td>{transaction.amount}</td>
              <td>{transactionTimestamp}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  } else {
    transactionData = <p>{block.data}</p>;
  }

  return (
    <div className={`block ${true ? 'valid' : 'invalid'}`}>
      <p><strong>Block {index}</strong></p>
      <p>Block Time: {formattedTimestamp}</p>
      <p>Hash: <span style={{ color: generateColorFromHash(block.hash) }}>{truncateHash(block.hash)}</span></p>
      <p>Previous Hash: <span style={{ color: generateColorFromHash(block.previousHash) }}>{truncateHash(block.previousHash)}</span></p>
      <p>Trasactions {transactionData}</p>
    </div>
  );
};

export default BlockComponent;