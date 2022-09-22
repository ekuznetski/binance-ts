import { IWallet } from "../domain/interfaces/wallet.interface";
import localStorageService from "../services/localStorage.service";
import { addWalletAction, setUnhashedKeyAction } from "../store/data.slice";
import { useTypedDispatch, useTypedSelector } from "./store";

export function useWalletsSelector() {
  return useTypedSelector((state) => state.data.wallets);
}

export function useWalletDispatch() {
  const dispatch = useTypedDispatch();

  function _addWallet(wallet: IWallet) {
    return function addWalletThunk(dispatch, getState) {
      localStorageService.write(wallet);
      dispatch(addWalletAction(wallet));
    };
  }
  const addWallet = (wallet: IWallet) => dispatch(_addWallet(wallet));
  const setUnhashedKey = (args: {
    walletAddress: string;
    unhashedKey: string | null;
  }) => dispatch(setUnhashedKeyAction(args));
  return { addWallet, setUnhashedKey };
}
