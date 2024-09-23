import React, { useState } from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import BlockComponent from '../BlockComponent';
import { Transaction } from '../../blockchain/Transaction';
import { Mempool } from '../../blockchain/Mempool';
import { Miner } from '../../blockchain/Miner';

import { getRandomTimestamp } from '../../utils/getRandomTimestamp';

import './DisplayBlockchainComponent.css';

const sampleTransactions: Transaction[] = [
  new Transaction('Charlie','Dave', 30, getRandomTimestamp()),
  new Transaction('Eve', 'Frank', 20, getRandomTimestamp()),
  new Transaction('Grace', 'Heidi', 10, getRandomTimestamp()),
  new Transaction('Ivan', 'Judy', 40, getRandomTimestamp())
];

interface DisplayBlockchainProps {
  blockchain: Blockchain;
  difficulty: number;
}

const DisplayBlockchainComponent: React.FC<DisplayBlockchainProps> = ({
  blockchain,
  difficulty
}) => {
  const [mempool] = useState<Mempool>(new Mempool());
  const [miningTime, setMiningTime] = useState<number>(0);
  const miner = new Miner(blockchain, mempool, "[miner]");  

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [noMoreTransactions, setNoMoreTransactions] = useState<boolean>(false);  

  const generateBlock = async () => {
    if (blockchain && miner) {
      const transactionIndex = Math.floor(Math.random() * sampleTransactions.length);
      const transaction = sampleTransactions[transactionIndex];

      // Check if the transaction is not null before adding to the mempool
      if (transaction) {      
        mempool.addTransaction(transaction);

        // Mining pending transaction and set the mining time
        setMiningTime(miner.minePendingTransactions());
        
        // Remove the transaction from sampleTransactions
        sampleTransactions.splice(transactionIndex, 1);

        // If no more transactions left, set the noMoreTransactions state
        if (sampleTransactions.length === 0) {
          setNoMoreTransactions(true);
        }        
      }     
    }
  };  
  
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
        <h1 className="blockchain-header">Blockchain Lab</h1>
        <p className="block-count">Number of Blocks: {blockchain.chain.length}</p>
        <div className="status-bar">
          <p className="elapsed-time">Mining Time: {miningTime} seconds with difficulty level {difficulty}</p>
          {noMoreTransactions && (
            <p className="no-more-transactions">No transactions available in the sample data</p>
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