import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
      saveDeployments: true,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    outputFile: "gas-report.txt",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  typechain: {
    outDir: "typechain",
  },
  paths: {
    tests: "tests",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
