import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployThirdBook: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("deploying ERC1155 Book Contract");
  const receipt = await deploy("ThirdBook", {
    from: deployer,
    args: [],
    log: true,
  });
  log("deployed ERC1155 Book contract at " + receipt.address);
};

export default deployThirdBook;
deployThirdBook.tags = ["all", "book"];
