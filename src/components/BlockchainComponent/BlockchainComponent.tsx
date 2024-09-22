import React, { useState } from 'react';

import { Blockchain } from '../../blockchain/Blockchain';
import { Mempool } from '../../blockchain/Mempool';
import { Miner } from '../../blockchain/Miner';
import { Transaction } from '../../blockchain/Transaction';

import CreateBlockchainComponent from '../CreateBlockchainComponent';
import DisplayBlockchainComponent from '../DisplayBlockchainComponent';

import { getRandomTimestamp } from '../../utils/getRandomTimestamp';

import './BlockchainComponent.css';

const sampleTransactions: Transaction[] = [
  new Transaction('Charlie','Dave', 30, getRandomTimestamp()),
  new Transaction('Eve', 'Frank', 20, getRandomTimestamp()),
  new Transaction('Grace', 'Heidi', 10, getRandomTimestamp()),
  new Transaction('Ivan', 'Judy', 40, getRandomTimestamp())
];

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [blockCount, setBlockCount] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<number>(2);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [noMoreTransactions, setNoMoreTransactions] = useState<boolean>(false);
  const [mempool] = useState<Mempool>(new Mempool());
  const [miner, setMiner] = useState<Miner | null>(null); 

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setDifficulty(value);
    if (value > 5) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const createNewBlockchain = () => {
    if (difficulty > 5 && !window.confirm('High difficulty will take longer time to generate blocks. Do you want to continue?')) {
      return;
    }

    const blockchain = new Blockchain(difficulty, mempool);
    const miner = new Miner(blockchain, "[miner]");

    setBlockchain(blockchain);
    setMiner(miner);

    setBlockCount(blockchain.chain.length);
    setView('view');
  };

  const generateBlock = async () => {
    if (blockchain && miner) {
      const transactionIndex = Math.floor(Math.random() * sampleTransactions.length);
      const transaction = sampleTransactions[transactionIndex];

      // Check if the transaction is not null before adding to the mempool
      if (transaction) {      
        mempool.addTransaction(transaction);

        const startTime = Date.now();
        
        miner.mineTransactions();
        
        const endTime = Date.now();
        setElapsedTime((endTime - startTime) / 1000);
        
        // Remove the transaction from sampleTransactions
        sampleTransactions.splice(transactionIndex, 1);

        // If no more transactions left, set the noMoreTransactions state
        if (sampleTransactions.length === 0) {
          setNoMoreTransactions(true);
        }        
      }     
    }
  };

  return (
    <div>
      {view === 'create' ? (
        <CreateBlockchainComponent
          difficulty={difficulty}
          showWarning={showWarning}
          handleDifficultyChange={handleDifficultyChange}
          createNewBlockchain={createNewBlockchain}
        />
      ) : (
        blockchain && (
          <DisplayBlockchainComponent
            blockchain={blockchain}
            blockCount={blockCount}
            elapsedTime={elapsedTime}
            noMoreTransactions={noMoreTransactions}
            generateBlock={generateBlock}
          />
        )
      )}  
    </div>
  );
};

export default BlockchainComponent;