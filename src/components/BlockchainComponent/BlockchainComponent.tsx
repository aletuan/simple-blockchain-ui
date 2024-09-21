import React, { useState } from 'react';
import { Blockchain } from '../../blockchain/Blockchain';
import { Block } from '../../blockchain/Block';
import CreateBlockchainComponent from '../CreateBlockchainComponent';
import DisplayBlockchainComponent from '../DisplayBlockchainComponent';
import { getRandomCapital } from '../../utils/getRandomCapital';
import './BlockchainComponent.css'; // Import the CSS file

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [blockCount, setBlockCount] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(2); // Default difficulty
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

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
    const newBlockchain = new Blockchain();
    setBlockchain(newBlockchain);
    setBlockCount(newBlockchain.chain.length);
    setView('view');
  };

  const generateBlock = async () => {
    if (blockchain) {
      const newBlock = new Block(Date.now(), blockchain.getLatestBlock().hash, getRandomCapital());
      const startTime = Date.now();
      newBlock.mineBlock(difficulty); // Mine the block with the specified difficulty
      const endTime = Date.now();
      setElapsedTime((endTime - startTime) / 1000); // Calculate elapsed time in seconds
      blockchain.addBlock(newBlock);
      // Update the block count to trigger a re-render
      setBlockCount(blockchain.chain.length);
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