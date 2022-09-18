import { NFTStorage, File } from "nft.storage";
import process from "../components/utils/types";
import type { Idata } from "../features/bookThunk";
import { AxiosRequestConfig } from "axios";
import baseApi from "./baseApi";
import axios from "axios";

const client = new NFTStorage({
  token: process.env.NFT_APIKEY,
});

export const _createBook = async (data: Idata) => {
  let { name, type } = data.bookcover;
  // save to nft.storage
  const metadata = await client.store({
    name: data.title,
    description: data.description,
    image: new File([data.bookcover], name, { type }),
    properties: {
      user: data.user,
      file: new File([data.bookpdf], data.bookpdf.name, {
        type: data.bookpdf.type,
      }),
      genre: data.genre,
      price: data.price,
    },
  });
  console.log(metadata.data);
  // // publish to the blockchain
  return metadata;
};

export const _getBooks = async () => {
  // return baseApi.get("/books/request-books", chain);
  baseApi.get("/books/request-books");
};

export const _boughtBooks = (addr: string, chain: string) => {
  const data = {
    chain,
    addr,
  } as AxiosRequestConfig;
  baseApi.get("/books/request-walletBooks", data);
};

export const _getGenres = () => {};

export const _buyBook = () => {};
