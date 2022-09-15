import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import contracts from "../../../constants/contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getAllBooks();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllBooks = async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const response = await Moralis.EvmApi.nft.getContractNFTs({
    address: contracts.BookContract.address,
    chain: 5,
  });
  if (response) return response?.toJSON();
  return null;
};

export default handler;
