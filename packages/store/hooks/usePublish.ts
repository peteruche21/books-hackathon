import contracts from "../constants/contracts";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import { useSession } from "next-auth/react";

const usePublish = () => {
  const [args, setArgs] = useState<[number, BigNumber, string]>();
  const { data: sessionData } = useSession();
  // @ts-ignore
  const user = sessionData?.user?.address;
  console.log(user);

  const { config } = usePrepareContractWrite({
    addressOrName: contracts.ShopContract.address,
    contractInterface: contracts.ShopContract.abi,
    functionName: "publish",
    // args: args,
    overrides: {
      from: user,
      value: ethers.utils.parseEther("0.01"),
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const publish = (amount: number, price: string, uri: string) => {
    setArgs([amount, ethers.utils.parseUnits(price, 6), uri]);
    console.log("trying to write");
    write!();
    return { data, isLoading, isSuccess };
  };
  return publish;
};

export default usePublish;
