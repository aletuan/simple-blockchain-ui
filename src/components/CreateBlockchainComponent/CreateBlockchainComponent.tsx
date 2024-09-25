import React from 'react';
import './CreateBlockchainComponent.css';

interface CreateBlockchainProps {
  difficulty: number;
  intervalTime: number;
  showWarning: boolean;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createNewBlockchain: () => void;
}

const CreateBlockchainComponent: React.FC<CreateBlockchainProps> = ({
  difficulty,
  intervalTime,
  showWarning,
  handleDifficultyChange,
  handleIntervalChange,
  createNewBlockchain
}) => {
  return (
    <div className="create-blockchain ">
      <h1>Create Blockchain</h1>
      <div className="input-group">
        <label htmlFor="difficulty">Mining difficulty:</label>
        <input
          type="number"
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          min="1"
        />
      </div>
      <div className="input-group">
        <label>
          New transactions in milliseconds:
          <input
            type="number"
            id="intervalTime"
            value={intervalTime}
            onChange={handleIntervalChange}
          />
        </label>
      </div>    
      {showWarning && <p className="warning">High difficulty will take longer time to generate blocks.</p>}
      <button className="create-button" onClick={createNewBlockchain}>Create New Blockchain</button>
    </div>
  );
};

export default CreateBlockchainComponent;