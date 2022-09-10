import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployUsdToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying ERC20 USD Token Contract");
  const receipt = await deploy("USD", {
    from: deployer,
    args: [],
    log: true,
  });
  log("deployed ERC20 USD Token contract at " + receipt.address);
};

export default deployUsdToken;
deployUsdToken.tags = ["all", "usd"];
