import React, { useState, useEffect, useRef } from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import BlockComponent from '../BlockComponent';
import { Mempool } from '../../blockchain/Mempool';
import { Miner } from '../../blockchain/Miner';

import { TransactionService } from '../../services/TransactionService';


import './DisplayBlockchainComponent.css';


interface DisplayBlockchainProps {
  blockchain: Blockchain;
  difficulty: number;
}

const DisplayBlockchainComponent: React.FC<DisplayBlockchainProps> = ({
  blockchain,
  difficulty
}) => {

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const transactionServiceRef = useRef<TransactionService | null>(null);

  if (!transactionServiceRef.current) {
    // Generate new transaction every 6 seconds
    transactionServiceRef.current = new TransactionService(1000);
  }

  const [mempool] = useState<Mempool>(new Mempool());
  const [miningTime, setMiningTime] = useState<number>(0);
  const miner = new Miner(blockchain, mempool, "[miner]");
  const transactionService = transactionServiceRef.current;
  const [remainingTransactions, setRemainingTransactions] = useState<number>(transactionService.getTransactionCount());    

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTransactions(transactionService.getTransactionCount());
    }, 1000);

    return () => clearInterval(interval);
  }, [transactionService]);  

  const generateBlock = async () => {
    if (blockchain && miner) {
      const pendingTransaction = transactionService.miningTransaction();

      // Check if the transaction is not null before adding to the mempool
      if (pendingTransaction) {      
        mempool.addTransaction(pendingTransaction);

        // Mining pending transaction and set the mining time
        setMiningTime(miner.minePendingTransactions());        
      }     
    }
  };  
  
  const handleGenerateBlock = async () => {
    setIsGenerating(true);
    setTimeout(async () => {
        await generateBlock();
        setIsGenerating(false);        
        setRemainingTransactions(transactionService.getTransactionCount());
      }, 0);
  };  

  return (
    <div className="blockchain-view-container">
      <div className="blockchain-view">
        <h1 className="blockchain-header">Blockchain Lab</h1>
        <p className="block-count">Number of Blocks: {blockchain.chain.length}</p>
        <p className="transaction-count">Remaining Transactions: {remainingTransactions}</p>        
        <div className="status-bar">
          <p className="elapsed-time">Mining Time: {miningTime} seconds with difficulty level {difficulty}</p>
          {remainingTransactions === 0 && (
            <p className="no-more-transactions">No transactions available in the sample data</p>
          )}
        </div>
        <button
          className="generate-button"
          onClick={handleGenerateBlock}
          disabled={isGenerating || remainingTransactions === 0} // Disable button when no more transactions
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