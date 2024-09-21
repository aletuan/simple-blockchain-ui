import React, { useState } from 'react';
import { Blockchain } from '../blockchain/Blockchain';
import { Block } from '../blockchain/Block';
import BlockComponent from './BlockComponent';

const BlockchainComponent: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [view, setView] = useState<'create' | 'view'>('create');
  const [blockCount, setBlockCount] = useState<number>(0);

  const createNewBlockchain = () => {
    const newBlockchain = new Blockchain();
    setBlockchain(newBlockchain);
    setBlockCount(newBlockchain.chain.length);
    setView('view');
  };

  const generateBlock = () => {
    if (blockchain) {
      const newBlock = new Block(Date.now(), blockchain.getLatestBlock().hash, `Block ${blockchain.chain.length}`);
      blockchain.addBlock(newBlock);
      // Update the block count to trigger a re-render
      setBlockCount(blockchain.chain.length);
    }
  };

  return (
    <div>
      {view === 'create' ? (
        <div>
          <h1>Create New Blockchain</h1>
          <button onClick={createNewBlockchain}>Create New Blockchain</button>
        </div>
      ) : (
        <div>
          <h1>Simple Blockchain</h1>
          <p>Number of Blocks: {blockCount}</p>
          <div id="blockchain">
            {blockchain?.chain.map((block, index) => (
              <BlockComponent key={index} block={block} index={index} isValid={blockchain.isChainValid()} />
            ))}
          </div>
          <button onClick={generateBlock}>Generate New Block</button>
        </div>
      )}
    </div>
  );
};

export default BlockchainComponent;