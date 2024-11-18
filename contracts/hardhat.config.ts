import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";
// import "dotenv/config";
import { HardhatUserConfig, vars } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

// const DO_NOT_LEAK = vars.get("DO_NOT_LEAK") || process.env.DO_NOT_LEAK!;
// const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY") || process.env.ETHERSCAN_API_KEY!;

// const {DO_NOT_LEAK, ETHERSCAN_API_KEY} = process.env;
const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        "lisk-sepolia": {
            url: "https://rpc.sepolia-api.lisk.com",
            accounts: [process.env.DO_NOT_LEAK!],
            gasPrice: 1000000000,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
        },
    },
    etherscan: {
        // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
        "lisk-sepolia": "123",
      },
        // apiKey: ETHERSCAN_API_KEY,
        customChains: [
            {
                network: "lisk-sepolia",
                chainId: 4202,
                urls: {
                    apiURL: "https://sepolia-blockscout.lisk.com/api",
                    browserURL: "https://sepolia-blockscout.lisk.com/",
                },
            },
        ],
    },
};

export default config;
