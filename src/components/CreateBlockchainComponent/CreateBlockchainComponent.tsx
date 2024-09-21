import React from 'react';
import './CreateBlockchainComponent.css';

interface CreateBlockchainProps {
  difficulty: number;
  showWarning: boolean;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createNewBlockchain: () => void;
}

const CreateBlockchainComponent: React.FC<CreateBlockchainProps> = ({
  difficulty,
  showWarning,
  handleDifficultyChange,
  createNewBlockchain
}) => {
  return (
    <div className="create-blockchain ">
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
  );
};

export default CreateBlockchainComponent;