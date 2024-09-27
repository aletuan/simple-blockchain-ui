# Simple Blockchain Demo

This project demonstrates a simple blockchain implementation with a user interface for creating and viewing blocks. The application allows users to generate new blocks, view the blockchain, and see the details of each block.

## Features

- Create a new blockchain with a specified difficulty level.
- Add transactions to the mempool.
- Mine new blocks and add them to the blockchain.
- View the blockchain and the details of each block.
- Display a unique identifier for the miner based on the running instance.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/simple-blockchain-ui.git
   cd simple-blockchain-ui
   ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:

    ```sh
    npm start
    ```

## Mining Process

The mining process in this application involves generating a new block and adding it to the blockchain. Here is a detailed explanation of how the mining process works:

1. Initiate Mining:

- When the user clicks the "Generate New Block" button, the mining process starts.
- The button is disabled and its label changes to "Generating..." to indicate that the mining process is in progress.

2. Generate Block:

- A new block is created with the current timestamp and the hash of the latest block.
- The block is then mined with the specified difficulty. This involves finding a nonce value that makes the block's hash meet the difficulty criteria.

3. Update Blockchain:

- Once the block is successfully mined, it is added to the blockchain.
- The elapsed time for mining the block is calculated and displayed.

4. Re-enable Button:

- After the block is added to the blockchain, the "Generate New Block" button is re-enabled and its label changes back to "Generate New Block".

## Usage (TBD)