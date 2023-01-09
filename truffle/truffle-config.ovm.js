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
