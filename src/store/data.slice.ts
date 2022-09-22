import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataStore } from "../domain/interfaces/store.interface";
import { IWallet } from "../domain/interfaces/wallet.interface";
import localStorageService from "../services/localStorage.service";

export const initialDataState: IDataStore = {
  wallets: localStorageService.read(),
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    addWallet: (state, { payload }: PayloadAction<IWallet>) => {
      if (payload) {
        state.wallets[payload.address] = payload;
      } else {
        console.error("addWallet payload is empty");
      }
    },
    setDecryptedKey: (
      state,
      {
        payload,
      }: PayloadAction<{
        walletAddress: IWallet["address"];
        decryptedKey: string | null;
      }>
    ) => {
      if (payload) {
        state.wallets[payload.walletAddress].decryptedKey =
          payload.decryptedKey;
      } else {
        console.error("setDecryptedKey payload is empty");
      }
    },
  },
});

export const {
  addWallet: addWalletAction,
  setDecryptedKey: setDecryptedKeyAction,
} = dataSlice.actions;

export const dataSliceReducer = dataSlice.reducer;
