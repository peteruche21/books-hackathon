import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import type { Idata } from "../features/bookThunk";
import bookService from "./blockchain.service";

const client = new NFTStorage({
  token: process.env.NEXT_APIKEY,
});

export const _createBook = async (data: Idata) => {
  let { name, type } = data.bookpdf;
  // save to nft.storage
  const metadata = await client.store({
    name: data.title,
    description: data.description,
    image: new File([data.bookpdf], name, { type }),
    properties: {
      user: data.user,
      file: new File([data.bookcover], data.bookcover.name, {
        type: data.bookcover.type,
      }),
      genre: data.genre,
      price: data.price,
    },
  });
  // console.log(metadata)
  // publish to the blockchain
  if (metadata) {
    bookService.setURI(metadata.url);
  }
  return metadata;
};

export const _getBooks = () => {};

export const _getGenres = () => {};

export const _buyBook = () => {};

export const _boughtBooks = () => {};
