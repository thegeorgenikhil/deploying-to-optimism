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
    goerli: {
      provider: () => {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://goerli.infura.io/v3/" + process.env.PRIVATE_KEY
        );
      },
      network_id: "5", // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
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
