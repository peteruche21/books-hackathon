import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import contracts from "../../../constants/contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.body;

  try {
    const response = await getWalletBooks(address);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getWalletBooks = async (address: string) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain: 5,
    tokenAddresses: [contracts.BookContract.address],
  });
  console.log("wallet book nfts", response);
  if (response) return response?.toJSON();
  return null;
};

export default handler;
