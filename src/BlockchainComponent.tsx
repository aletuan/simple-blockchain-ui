import React, { useState } from 'react';
import { Blockchain } from './Blockchain';
import { Block } from './Block';
import BlockComponent from './BlockComponent';

const BlockchainComponent: React.FC = () => {
  const [blockchain] = useState(new Blockchain());
  const [blockchainState, setBlockchain] = useState(blockchain);

  const generateBlock = () => {
    const newBlock = new Block(Date.now(), blockchain.getLatestBlock().hash, `Block ${blockchain.chain.length}`);
    blockchain.addBlock(newBlock);
    setBlockchain(new Blockchain());
  };

  return (
    <div>
      <h1>Simple Blockchain</h1>
      <div id="blockchain">
        {blockchainState.chain.map((block, index) => (
          <BlockComponent key={index} block={block} index={index} isValid={blockchainState.isChainValid()} />
        ))}
      </div>
      <button onClick={generateBlock}>Generate New Block</button>
    </div>
  );
};

export default BlockchainComponent;