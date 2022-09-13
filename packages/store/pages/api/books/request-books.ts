import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import contracts from "../../../constants/contracts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { chain } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  try {
    const response = await Moralis.EvmApi.nft.getContractNFTs({
      address: contracts.BookContract.address,
      chain,
    });
    res.status(200).json(response.toJSON());
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default handler;