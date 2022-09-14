import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createBook,
  _getBooks,
  _getGenres,
  _boughtBooks,
  _buyBook,
} from "../services/nftstorage";

const errorHandler = (error: any, reject: any) => {
  // error res
  console.log(error);
  if (error.response && error.response.status === 500) {
    return reject("server error");
  }
  if (error.response && error.response.status === 400) {
    return reject(error.response.data || "Something went wrong. Bad request");
  }
  return reject("Something went wrong .Please try again later");
};

const addCommas = (x: string) => {
  // a.filter((el) => {
  //    el.price = Number(el.amount);
  //    el.price = el.price.toLocaleString(undefined,
  // { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  // });
};

export interface Idata {
  title: string;
  description: string;
  bookpdf: any;
  bookcover: any;
  user: string;
  genre: string;
  price: string;
}

export interface Ibook {
  data: Idata[];
  url: string;
  purchases: Idata[];
  error: string;
  message: string;
  Loading: string;
  Loading2: string;
}

export const getBooks = createAsyncThunk<any, any>(
  "getBooks",
  async (data, { rejectWithValue }) => {
    try {
      const res = (await _createBook(data)) as any;
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const getGenres = createAsyncThunk<any, any>(
  "getGenres",
  async (data, { rejectWithValue }) => {
    try {
      const res = await _createBook(data);
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const boughtBooks = createAsyncThunk<any, any>(
  "boughtBooks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await _createBook(data);
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const createBook = createAsyncThunk<any, Idata>(
  "createBook",
  async (data, { rejectWithValue }) => {
    try {
      const metadata = await _createBook(data);
      if (metadata) {
        return metadata;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const buyBook = createAsyncThunk<any, any>(
  "buyBook",
  async (data, { rejectWithValue }) => {
    try {
      const res = await _createBook(data);
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);
