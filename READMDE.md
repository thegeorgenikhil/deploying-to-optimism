# Deploying to Optimism

This is a guide to deploying to Optimism. We deploying to optimism using 4 Ethereum Development Tools

- Brownie
- Foundry
- Hardhat
- Truffle

### Points to note

- For verifying the contract get the API keys from [https://optimistic.etherscan.io/](https://optimistic.etherscan.io/)
- Before deploying add in some OP in your metamask from [https://app.optimism.io/bridge/deposit](https://app.optimism.io/bridge/deposit)

## 1. Deploying to Optimism using Brownie

Note: Deploying to optimism-goerli is not supported by default in Brownie so we have to add the configuration manually.

### Add Optimism Network Configuration

```bash
brownie networks add "Optimistic Ethereum" optimism-goerli host=https://goerli.optimism.io chainid=420 explorer=https://api-goerli-optimism.etherscan.io/api multicall2=0x2DC0E2aa608532Da689e89e237dF582B783E552C
```

### Deploying to Optimism

- Create a `brownie-config.yaml` file and add this

```
dotenv: .env
```

- Add in the variable in a `.env` file

```
WEB3_ALCHEMY_PROJECT_ID=<alchemy-project-id>
ETHERSCAN_TOKEN=<api-key-from-optimism-etherscan>
```

- Run the deploy script

Note: for verification set publish_source=True when writing the scripts/deploy.py file.

```bash
brownie run scripts/deploy.py  --network optimism-goerli
```

## 2. Deploying (along with verification) to Optimism using Foundry

- Add the variable to your terminal

```
export PRIVATE_KEY=<private-key-here>
export ETHERSCAN_API_KEY=<api-key-from-optimism-etherscan>
export GOERLI_URL=<alchemy-goerli-optimism-endpoint>
```

- Run the deploy script

```bash
forge create --rpc-url $GOERLI_URL --private-key $PRIVATE_KEY src/Greeter.sol:Greeter --constructor-args "Hello, Forge" --etherscan-api-key $ETHERSCAN_API_KEY --verify
```

## 3. Deploying to Optimism using Hardhat

### Add Optimism Network Configuration to hardhat.config.js

- Add in the variable in your .env file

```
PRIVATE_KEY=<private-key-here>
ETHERSCAN_API_KEY=<api-key-from-optimism-etherscan>
ALCHEMY_API_KEY=<alchemy-goerli-optimism-endpoint>
```

- Add in the optimism goerli network configuration in the module.exports.networks

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    "optimism-goerli": {
      url: `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
```

### Deploying to Optimism

- Run the deploy script

```bash
npx hardhat run scripts/deploy.js --network optimism-goerli
```

### Verifying the contract on Optimism Etherscan

```
npx hardhat verify --network optimism-goerli  <contract-address> "Hello, Hardhat!"
```

## 4. Deploying to Optimism using Truffle

Useful Reading - [Truffle Optimism](https://trufflesuite.com/boxes/optimism/)

### Add Optimism Network Configuration to truffle-config.ovm.js

- Install the packages

```bash
npm i dotenv @truffle/hdwallet-provider truffle-plugin-verify
```

- Add in all the variable in a .env file

```
PRIVATE_KEY=<private-key-here>
ALCHEMY_API_KEY=<alchemy-goerli-optimism-endpoint>
ETHERSCAN_KEY=<api-key-from-optimism-etherscan>
```

- Create a new `truffle-config.ovm.js` file and add this

```js
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    optimistic_goerli: {
      network_id: 420,
      chain_id: 420,
      provider: function () {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://opt-goerli.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
          0,
          1
        );
      },
    },
    develop: {
      port: 8545,
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
  },
  plugins: ["truffle-plugin-verify"],
};
```

- To compile the contract

```
truffle compile --config truffle-config.ovm.js
```

- To test the contract

```
truffle test --config truffle-config.ovm.js --network optimistic_goerli
```

### Deploying to Optimism

```
truffle migrate --skip-dry-run --config truffle-config.ovm.js --network optimistic_goerli
```

### Verifying the contract on Optimism Etherscan

```
truffle run verify Greeter --config truffle-config.ovm.js --network optimistic_goerli
```
