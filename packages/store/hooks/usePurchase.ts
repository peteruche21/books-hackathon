import contracts from "../constants/contracts";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";

const usePurchase = (userAddress: string) => {
  const [args, setArgs] = useState<number>();
  const amount: BigNumber = ethers.utils.parseUnits("1000", 6);

  const {
    data: allowance,
    // isError: readError,
    // isLoading: readLoading,
  } = useContractRead({
    addressOrName: contracts.USDContract.address,
    contractInterface: contracts.USDContract.abi,
    functionName: "allowance",
    args: [userAddress, contracts.ShopContract.address],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    addressOrName: contracts.USDContract.address,
    contractInterface: contracts.USDContract.abi,
    functionName: "approve",
    args: [contracts.ShopContract.address, amount],
  });

  const {
    // data: approveData,
    // isLoading: approvalLoading,
    // isSuccess: approvalSuccess,
    write: approve,
  } = useContractWrite(approveConfig);

  const { config: purchaseConfig } = usePrepareContractWrite({
    addressOrName: contracts.ShopContract.address,
    contractInterface: contracts.ShopContract.abi,
    functionName: "purchase",
    args: args,
  });

  const {
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    write: purchaseBook,
  } = useContractWrite(purchaseConfig);

  const purchase = (tokenId: number) => {
    setArgs(tokenId);
    if (args === tokenId) {
      if (allowance?.toString()! < amount.toString()) approve?.();
      purchaseBook?.();
    }
    return { writeData, writeLoading, writeSuccess };
  };

  return purchase;
};

export default usePurchase;
