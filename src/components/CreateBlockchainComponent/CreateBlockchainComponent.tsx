import React from 'react';
import './CreateBlockchainComponent.css';

interface CreateBlockchainProps {
  difficulty: number;
  intervalTime: number;
  showWarning: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createNewBlockchain: () => void;
}

const CreateBlockchainComponent: React.FC<CreateBlockchainProps> = ({
  difficulty,
  intervalTime,
  showWarning,
  handleInputChange,
  createNewBlockchain
}) => {
  return (
    <div className="create-blockchain ">
      <h1>Create Blockchain</h1>
      <div className="input-group">
        <label htmlFor="difficulty">Mining difficulty</label>
        <input
          type="number"
          id="difficulty"
          value={difficulty}
          onChange={(event) => handleInputChange(event)}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor='intervalTime'>
          New Transaction after seconds
          </label>
          <input
            type="number"
            id="intervalTime"
            value={intervalTime}
            onChange={(event) => handleInputChange(event)}
          />
      </div>    
      {showWarning && <p className="warning">High difficulty will take longer time to generate blocks.</p>}
      <button className="create-button" onClick={createNewBlockchain}>Submit</button>
    </div>
  );
};

export default CreateBlockchainComponent;