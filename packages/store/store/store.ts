import { configureStore } from "@reduxjs/toolkit";
import bookReducers from "../features/bookSlice";

const reducer = {
  bookReducer: bookReducers.Reducer,
};
export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
