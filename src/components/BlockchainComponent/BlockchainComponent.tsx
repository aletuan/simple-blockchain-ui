import React, { useState } from 'react';

import { Blockchain } from '../../blockchain/Blockchain';

import CreateBlockchainComponent from '../CreateBlockchainComponent';
import DisplayBlockchainComponent from '../DisplayBlockchainComponent';


import './BlockchainComponent.css';


const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [difficulty, setDifficulty] = useState<number>(2);
  const [showWarning, setShowWarning] = useState<boolean>(false);

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

    const blockchain = new Blockchain(difficulty);
    setBlockchain(blockchain);

    setView('view');
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
            difficulty={difficulty}
          />
        )
      )}  
    </div>
  );
};

export default BlockchainComponent;