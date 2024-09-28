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
  intervalTime: number;
}

const DisplayBlockchainComponent: React.FC<DisplayBlockchainProps> = ({
  blockchain,
  difficulty,
  intervalTime
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const transactionServiceRef = useRef<TransactionService | null>(null);

  if (!transactionServiceRef.current) {
    transactionServiceRef.current = new TransactionService(intervalTime);
  }

  const [mempool] = useState<Mempool>(new Mempool());
  const [miningTime, setMiningTime] = useState<number>(0);
  const miner = new Miner(blockchain, mempool, 'localhost');
  const transactionService = transactionServiceRef.current;
  const [remainingTransactions, setRemainingTransactions] = useState<number>(transactionService.getTransactionCount());

  const [currentPage, setCurrentPage] = useState(1);
  const blocksPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(blockchain.chain.length / blocksPerPage);

  // Get the blocks for the current page
  const currentBlocks = blockchain.chain.slice(
    (currentPage - 1) * blocksPerPage,
    currentPage * blocksPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTransactions(transactionService.getTransactionCount());
    }, 1000);

    return () => clearInterval(interval);
  }, [transactionService]);  

  const generateBlock = async () => {
    if (blockchain && miner) {
      const pendingTransactions = transactionService.miningTransactions();

      // Check if the transaction is not null before adding to the mempool
      if (pendingTransactions) {      
        mempool.addTransactions(pendingTransactions);

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
        <p className="block-count">Difficulty {difficulty} | Remaining Tnx: {remainingTransactions}</p>
        <p className="elapsed-time">Took {miningTime} seconds to mine the last block {blockchain.chain.length-1}</p>
        
        <button
          className="generate-button"
          onClick={handleGenerateBlock}
          disabled={isGenerating || remainingTransactions === 0} // Disable button when no more transactions
        >
          {remainingTransactions === 0 ? 'No more transaction' : isGenerating ? 'Generating...' : 'Generate New Block'}
        </button>
        
        <div className="pagination">
          <div className="pagination-control">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className="pagination-button"
              >
                {index + 1}
              </button>
            ))}
          </div>
        
          <div className="blockchain-list">
            {currentBlocks.map((block, index) => {
              const currentIndex = (currentPage - 1) * blocksPerPage + index
              return <BlockComponent key={currentIndex} block={block} index={currentIndex} isValid={blockchain.isChainValid()} />
            })}
          </div>          
        </div>
      </div>
    </div>
  );
};

export default DisplayBlockchainComponent;