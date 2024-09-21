import React from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import BlockComponent from '../BlockComponent';
import './DisplayBlockchainComponent.css';

interface DisplayBlockchainProps {
  blockchain: Blockchain;
  blockCount: number;
  elapsedTime: number;
  generateBlock: () => void;
}

const DisplayBlockchainComponent: React.FC<DisplayBlockchainProps> = ({
  blockchain,
  blockCount,
  elapsedTime,
  generateBlock
}) => {
  return (
    <div className="blockchain-view">
      <h1 className="blockchain-header">Simple Blockchain</h1>
      <p className="block-count">Number of Blocks: {blockCount}</p>
      <p className="elapsed-time">Elapsed Time: {elapsedTime} seconds</p>
      <button className="generate-button" onClick={generateBlock}>Generate New Block</button>      
      <div id="blockchain">
        {blockchain.chain.slice().reverse().map((block, index) => (
          <BlockComponent key={index} block={block} index={blockchain.chain.length - 1 - index} isValid={blockchain.isChainValid()} />
        ))}
      </div>
    </div>
  );
};

export default DisplayBlockchainComponent;