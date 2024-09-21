import React, { useState } from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import { Mempool } from '../../blockchain/Mempool';
import { Miner } from '../../blockchain/Miner';
import { Transaction } from '../../blockchain/Transaction';
import CreateBlockchainComponent from '../CreateBlockchainComponent';
import DisplayBlockchainComponent from '../DisplayBlockchainComponent';
import './BlockchainComponent.css';

const getRandomTimestamp = (): number => {
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 1000000000); // Random offset within a range
  return now - randomOffset;
};

const sampleTransactions: Transaction[] = [
  new Transaction('Charlie','Dave', 30),
  new Transaction('Eve', 'Frank', 20),
  new Transaction('Grace', 'Heidi', 10),
  new Transaction('Ivan', 'Judy', 40)
];

// Manually set random timestamps for sample transactions
sampleTransactions.forEach(transaction => {
  transaction.timestamp = getRandomTimestamp();
});

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [blockCount, setBlockCount] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(2); // Default difficulty
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
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
    const newBlockchain = new Blockchain(difficulty);
    setBlockchain(newBlockchain);
    setMiner(new Miner(mempool, newBlockchain));
    setBlockCount(newBlockchain.chain.length);
    setView('view');
  };

  const generateBlock = async () => {
    if (blockchain && miner) {
      const transactionIndex = Math.floor(Math.random() * sampleTransactions.length);
      const transaction = sampleTransactions[transactionIndex];

      mempool.addTransaction(transaction);

      const startTime = Date.now();
      
      // newBlock.mineBlock(difficulty); // Mine the block with the specified difficulty
      miner.mineTransactions();
      
      const endTime = Date.now();
      setElapsedTime((endTime - startTime) / 1000); // Calculate elapsed time in seconds
      
      // Update the block count to trigger a re-render
      setBlockCount(blockchain.chain.length);

      // Remove the transaction from sampleTransactions
      sampleTransactions.splice(transactionIndex, 1);      
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
            generateBlock={generateBlock}
          />
        )
      )}
    </div>
  );
};

export default BlockchainComponent;