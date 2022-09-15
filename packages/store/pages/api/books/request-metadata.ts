import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import contracts from "../../../constants/contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId, chain } = req.body;
  try {
    const response = await getMetadata(tokenId, chain);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export async function getMetadata(tokenId: string, chainId: number) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    address: contracts.BookContract.address,
    chain: 5,
    tokenId,
  });
  if (response) return response;
  return null;
}

export default handler;
