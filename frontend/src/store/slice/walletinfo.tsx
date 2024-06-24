import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  address: "",
};

export const walletInfoSlice = createSlice({
  name: "WalletInfo",
  initialState,
  reducers: {
    setWalletInfo(state, action) {
      state.address = action.payload.address;
    },
    resetWalletInfo(state) {
      return initialState;
    },
  },
});

export const { setWalletInfo, resetWalletInfo } = walletInfoSlice.actions;

export default walletInfoSlice.reducer;
