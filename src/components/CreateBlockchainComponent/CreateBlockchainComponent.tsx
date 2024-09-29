import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateBlockchainComponent.css';

const CreateBlockchainComponent = () => {
  const [miningDifficulty, setMiningDifficulty] = useState(3);
  const [intervalTime, setIntervalTime] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const inputValue = parseInt(value, 10);
    if (id === 'difficulty') {
      setMiningDifficulty(inputValue);
      setShowWarning(inputValue > 5);
    } else if (id === 'intervalTime') {
      setIntervalTime(inputValue);
    }
  };
  
  const createNewBlockchain = () => {
    if (miningDifficulty > 5 && !window.confirm('High difficulty will take longer time to generate blocks. Do you want to continue?')) {
      return;
    }

    // const blockchain = new Blockchain(miningDifficulty, intervalTime * 1000);
    navigate('/display-blockchain', { state: { miningDifficulty, intervalTime } });
  };  

  return (
    <div className="create-blockchain ">
      <h1>Create Blockchain</h1>
      <div className="input-group">
        <label htmlFor="difficulty">Mining difficulty</label>
        <input
          type="number"
          id="difficulty"
          value={miningDifficulty}
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
      {showWarning && <p className="warning">High difficulty take long time to mine new block.</p>}
      <button className="create-button" onClick={createNewBlockchain}>
          Submit
      </button>
    </div>
  );
};

export default CreateBlockchainComponent;