import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import books from "./baseApi";

const client = new NFTStorage({
  token: process.env.NEXT_APIKEY,
});

export const _createBook = async (data: any) => {
  let { name, type } = data.bookpdf;
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
  console.log("part-2====");
  console.log(metadata);
  return metadata;
};

export const _getBooks = () => {};

export const _getGenres = () => {};

export const _buyBook = () => {};

export const _boughtBooks = () => {};
