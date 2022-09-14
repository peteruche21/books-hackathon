import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import type { Idata } from "../features/bookThunk";
import usePublish from "../hooks/usePublish";
import baseApi from "./baseApi";

const client = new NFTStorage({
  token: process.env.NEXT_APIKEY,
});

export const _createBook = async (data: Idata) => {
  let { name, type } = data.bookpdf;
  // save to nft.storage
  const metadata = await client.store({
    name: data.title,
    description: data.description,
    image: new File([data.bookcover], data.bookcover.name, {
      type: data.bookcover.type,
    }),
    properties: {
      user: data.user,
      file: new File([data.bookpdf], name, { type }),
      genre: data.genre,
      price: data.price,
    },
  });
  console.log(metadata);
  // // publish to the blockchain
  return metadata;
};

export const _getBooks = (chain: string | number) => {
  return baseApi.get("/request-books");
};

export const _getGenres = () => {};

export const _buyBook = () => {};

export const _boughtBooks = () => {};
