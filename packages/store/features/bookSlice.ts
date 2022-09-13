import { createSlice } from "@reduxjs/toolkit";
import {
  getBooks,
  getGenres,
  createBook,
  boughtBooks,
  buyBook,
} from "./bookThunk";
import type { Ibook } from "./bookThunk";

const initialState: Ibook = {
  data: [],
  url: "",
  purchases: [],
  error: "",
  message: "",
  Loading: "",
  Loading2: "",
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.Loading = "loading... please wait";
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.Loading = "";
      if (payload) {
        state.data = payload;
      }
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.Loading = "";
      if (action.payload) {
        state.error = action.payload as string;
      }
    });

    builder.addCase(getGenres.pending, (state) => {
      state.Loading = "loading... please wait";
    });
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.Loading = "";
      if (payload) {
        state.data = payload;
      }
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      state.Loading = "";
      if (action.payload) {
        state.error = action.payload as string;
      }
    });

    builder.addCase(boughtBooks.pending, (state) => {
      state.Loading = "loading... please wait";
    });
    builder.addCase(boughtBooks.fulfilled, (state, { payload }) => {
      state.Loading = "";
      if (payload) {
        state.data = payload;
      }
    });
    builder.addCase(boughtBooks.rejected, (state, action) => {
      state.Loading = "";
      if (action.payload) {
        state.error = action.payload as string;
      }
    });

    builder.addCase(createBook.pending, (state) => {
      state.Loading = "loading... please wait";
    });
    builder.addCase(createBook.fulfilled, (state, { payload }) => {
      state.Loading = "";
      if (payload) {
        state.url = payload.url;
        state.data = payload.data;
      }
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.Loading = "";
      if (action.payload) {
        state.error = action.payload as string;
      }
    });

    builder.addCase(buyBook.pending, (state) => {
      state.Loading = "loading... please wait";
    });
    builder.addCase(buyBook.fulfilled, (state, { payload }) => {
      state.Loading = "";
      if (payload) {
        state.data = payload;
      }
    });
    builder.addCase(buyBook.rejected, (state, action) => {
      state.Loading = "";
      if (action.payload) {
        state.error = action.payload as string;
      }
    });
  },
});

const bookReducers = {
  Reducer: bookSlice.reducer,
};

export default bookReducers;
