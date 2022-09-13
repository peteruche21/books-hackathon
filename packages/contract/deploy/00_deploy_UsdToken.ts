import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";

const deployUsdToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const chainId: number | undefined = network.config.chainId;

  if (chainId === 31337) {
    // deploy test usdc token only if on hardhat network
    log("deploying ERC20 USD Token Contract");
    const receipt = await deploy("USD", {
      from: deployer,
      args: [],
      log: true,
    });
    log("deployed ERC20 USD Token contract at " + receipt.address);
  } else log("not deploying test usd contract");
};

export default deployUsdToken;
deployUsdToken.tags = ["all", "usd"];
