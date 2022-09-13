import { ethers, deployments, network } from "hardhat";

const main = async (): Promise<void> => {
  if (network.config.chainId === 31337)
    await deployments.fixture(["all"], { keepExistingDeployments: true });

  const nftContract = await deployments.get("ThirdBook");
  const shopContract = await deployments.get("ThirdBookShop");

  console.log("nftcontract: " + nftContract.address);
  console.log("shopContract: " + shopContract.address);

  const contract = await ethers.getContractAt(nftContract.abi, nftContract.address);

  const minter = await contract.MINTER_ROLE();
  const receipt = await contract.grantRole(minter, shopContract.address);
  console.log(receipt);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
