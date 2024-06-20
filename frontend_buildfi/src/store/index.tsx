// reducers/index.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { walletInfoSlice } from "./slice/walletinfo";

// import other slices as needed
const reducers = combineReducers({
  walletInfo: walletInfoSlice.reducer,
});

export const store: any = configureStore({
  reducer: reducers,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
