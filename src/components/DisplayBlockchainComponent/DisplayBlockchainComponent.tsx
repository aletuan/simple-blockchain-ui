import React, { useState } from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import BlockComponent from '../BlockComponent';
import './DisplayBlockchainComponent.css';

interface DisplayBlockchainProps {
  blockchain: Blockchain;
  elapsedTime: number;
  noMoreTransactions: boolean
  generateBlock: () => Promise<void>;
}

const DisplayBlockchainComponent: React.FC<DisplayBlockchainProps> = ({
  blockchain,
  elapsedTime,
  noMoreTransactions,
  generateBlock
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false); 
  
  const handleGenerateBlock = async () => {
    setIsGenerating(true);
    setTimeout(async () => {
        await generateBlock();
        setIsGenerating(false);
      }, 0);
  };  

  return (
    <div className="blockchain-view-container">
      <div className="blockchain-view">
        <h1 className="blockchain-header">Simple Blockchain</h1>
        <p className="block-count">Number of Blocks: {blockchain.chain.length}</p>
        <div className="status-bar">
          <p className="elapsed-time">Elapsed Time: {elapsedTime} seconds</p>
          {noMoreTransactions && (
            <p className="no-more-transactions">No more transactions available in the sample data.</p>
          )}
        </div>
        <button
          className="generate-button"
          onClick={handleGenerateBlock}
          disabled={isGenerating || noMoreTransactions} // Disable button when no more transactions
        >
          {isGenerating ? 'Generating...' : 'Generate New Block'}
        </button>             
        <div className="blockchain-list">
          {blockchain.chain.slice().reverse().map((block, index) => (
            <BlockComponent key={index} block={block} index={blockchain.chain.length - 1 - index} isValid={blockchain.isChainValid()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayBlockchainComponent;