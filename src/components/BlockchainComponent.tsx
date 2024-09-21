import React, { useState } from 'react';
import { Blockchain } from '../blockchain/Blockchain';
import { Block } from '../blockchain/Block';
import BlockComponent from './BlockComponent';
import { getRandomCapital } from '../utils/getRandomCapital';
import './BlockchainComponent.css'; // Import the CSS file

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [blockCount, setBlockCount] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(2); // Default difficulty
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
    const newBlockchain = new Blockchain();
    setBlockchain(newBlockchain);
    setBlockCount(newBlockchain.chain.length);
    setView('view');
  };

  const generateBlock = () => {
    if (blockchain) {
      const newBlock = new Block(Date.now(), blockchain.getLatestBlock().hash, getRandomCapital());
      newBlock.mineBlock(difficulty); // Mine the block with the specified difficulty
      blockchain.addBlock(newBlock);
      // Update the block count to trigger a re-render
      setBlockCount(blockchain.chain.length);
    }
  };

  return (
    <div>
      {view === 'create' ? (
        <div className="create-blockchain">
          <h1>Create New Blockchain</h1>
          <div className="input-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              type="number"
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              min="1"
            />
          </div>
          {showWarning && <p className="warning">High difficulty will take longer time to generate blocks.</p>}
          <button className="create-button" onClick={createNewBlockchain}>Create New Blockchain</button>
        </div>
      ) : (
        <div className="blockchain-view">
          <h1 className="blockchain-header">Simple Blockchain</h1>
          <p className="block-count">Number of Blocks: {blockCount}</p>
          <button className="generate-button" onClick={generateBlock}>Generate New Block</button>
          <div id="blockchain">
            {blockchain?.chain.slice().reverse().map((block, index) => (
              <BlockComponent key={index} block={block} index={blockchain.chain.length - 1 - index} isValid={blockchain.isChainValid()} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainComponent;