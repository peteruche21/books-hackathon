import { createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../services/books.service";

const errorHandler = (error: any, reject: any) => {
  // error res
  console.log(error.response);
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
  purchases: Idata[];
  error: string;
  message: string;
  Loading: string;
  Loading2: string;
}

export const getBooks = createAsyncThunk<Idata[], void>(
  "getBooks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookService.getBooks();
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const getGenres = createAsyncThunk<Idata[], string>(
  "getGenres",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookService.getGenres(data);
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const boughtBooks = createAsyncThunk<Idata[], string>(
  "boughtBooks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookService.boughtBooks(data);
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const createBook = createAsyncThunk<Idata[], Idata>(
  "createBook",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookService.createBook(data);
      if (res) {
        return res;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);

export const buyBook = createAsyncThunk<Idata[], any>(
  "buyBook",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookService.buyBook(data);
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (error) {
      errorHandler(error, rejectWithValue);
    }
  }
);
