import contracts from "../constants/contracts";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";

const usePublish = () => {
  const [args, setArgs] = useState<[number, BigNumber, string]>();
  const { config } = usePrepareContractWrite({
    addressOrName: contracts.ShopContract.address,
    contractInterface: contracts.ShopContract.abi,
    functionName: "publish",
    args: args,
    overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const publish = (amount: number, price: string, uri: string) => {
    setArgs([amount, ethers.utils.parseUnits(price, 6), uri]);
    write?.();
    return { data, isLoading, isSuccess };
  };
  return publish;
};

export default usePublish;
