import { BigNumber, Contract, ethers } from "ethers";
import React, { useState, useEffect } from "react";
import contracts from "../constants/contracts";

const useEthers = (userAddress: string) => {
  const [shopContract, setShopContract] = useState<Contract>();
  const [usdContract, setUsdContract] = useState<Contract>();
  const preApproval: BigNumber = ethers.utils.parseUnits("1000", 6);

  useEffect(() => {
    const conbaseWalletProvider = window.ethereum.providers.find(
      (wallet) => wallet.isCoinbaseWallet
    );
    const _provider = new ethers.providers.Web3Provider(conbaseWalletProvider);
    const _signer = _provider.getSigner();
    setUsdContract(
      new ethers.Contract(
        contracts.USDContract.address,
        contracts.USDContract.abi,
        _signer
      )
    );
    setShopContract(
      new ethers.Contract(
        contracts.ShopContract.address,
        contracts.ShopContract.abi,
        _signer
      )
    );
    console.log("sucessfully set useEthers state: eg", shopContract?.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allowance = async () => {
    const allowance = await usdContract?.allowance(
      userAddress,
      contracts.ShopContract.address
    );
    return allowance;
  };

  const approve = async () => {
    const tx = await usdContract?.approve(
      contracts.ShopContract.address,
      preApproval
    );
    const receipt = await tx.wait();
  };

  const publish = async (amount: number, price: string, uri: string) => {
    const tx = await shopContract?.publish(
      amount,
      ethers.utils.parseUnits(price, 6),
      uri,
      {
        value: ethers.utils.parseEther("0.01"),
      }
    );
    const receipt = await tx.wait();
    return { isSuccess: receipt.status, data: receipt };
  };

  const purchase = async (tokenId: number) => {
    const allowed = await allowance();
    if (allowed < preApproval) {
      await approve();
    }
    const tx = await shopContract?.purchase(tokenId);
    const receipt = await tx.wait();
    return { isSuccess: receipt.status, data: receipt };
  };
  return { publish, purchase };
};

export default useEthers;
