# Simple Blockchain Demo

This is a simple blockchain application built with React. The application allows you to create a new blockchain, generate new blocks, and display the blocks with some basic information. Each block contains a random capital city name, and the block's background color corresponds to the major color of the national flag of the country where the capital is located.

## Features

- Create a new blockchain with input of block mining difficulity
- Generate new blocks
- Display blocks with timestamp, previous hash, hash, and data (random capital city name)
- Color each block based on the major color of the national flag of the country where the capital is located

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

- A new block is created with the current timestamp, the hash of the latest block, and a random capital.
- The block is then mined with the specified difficulty. This involves finding a nonce value that makes the block's hash meet the difficulty criteria.

3. Update Blockchain:

- Once the block is successfully mined, it is added to the blockchain.
- The elapsed time for mining the block is calculated and displayed.

4. Re-enable Button:

- After the block is added to the blockchain, the "Generate New Block" button is re-enabled and its label changes back to "Generate New Block".

## Usage (TBD)