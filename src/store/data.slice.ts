import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataStore } from "../domain/interfaces/store.interface";
import { IWallet } from "../domain/interfaces/wallet.interface";
import localStorageService from "../services/localStorage.service";

const initialState: IDataStore = {
  wallets: localStorageService.read(),
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addWallet: (state, { payload }: PayloadAction<IWallet>) => {
      if (payload) {
        state.wallets.push(payload);
      } else {
        console.error("addWallet payload is empty");
      }
    },
  },
});

export const { addWallet: addWalletAction } = dataSlice.actions;

export const dataSliceReducer = dataSlice.reducer;
