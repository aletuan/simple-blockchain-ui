import React, { useState } from 'react';

import { Blockchain } from '../../blockchain/Blockchain';

import CreateBlockchainComponent from '../CreateBlockchainComponent';
import DisplayBlockchainComponent from '../DisplayBlockchainComponent';

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [difficulty, setDifficulty] = useState<number>(2);
  const [intervalTime, setIntervalTime] = useState<number>(5);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const inputValue = parseInt(value, 10);
    if (id === 'difficulty') {
      setDifficulty(inputValue);
      setShowWarning(inputValue > 5);
    } else if (id === 'intervalTime') {
      setIntervalTime(inputValue);
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
          intervalTime={intervalTime}
          handleInputChange={handleInputChange}
          createNewBlockchain={createNewBlockchain}
        />
      ) : (
        blockchain && (
          <DisplayBlockchainComponent
            blockchain={blockchain}
            difficulty={difficulty}
            intervalTime={intervalTime * 1000}
          />
        )
      )}  
    </div>
  );
};

export default BlockchainComponent;