import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";

const deployThirdBookShop: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const chainId: number | undefined = network.config.chainId;

  let UsdTokenAddress: string | undefined;
  let ThirdBookAddress: string | undefined;

  const CircleUSDCGoerli: string = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";

  if (chainId === 31337) {
    const UsdToken = await deployments.get("USD");
    UsdTokenAddress = UsdToken.address;
  } else UsdTokenAddress = CircleUSDCGoerli;

  const BookContract = await deployments.get("ThirdBook");
  ThirdBookAddress = BookContract.address;

  const deployArgs = [
    ethers.utils.parseEther("0.01"), // _shop_Fee
    2, // 2% of all purchases
    ThirdBookAddress,
    UsdTokenAddress,
  ];

  log("deploying BookStore Contract");
  const receipt = await deploy("ThirdBookShop", {
    from: deployer,
    args: deployArgs,
    log: true,
  });
  log("deployed  BookStore contract at " + receipt.address);
};

export default deployThirdBookShop;
deployThirdBookShop.tags = ["all", "store"];
