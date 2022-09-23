import { IWallet } from "../domain/interfaces/wallet.interface";
import { localStorageService } from "../services/localStorage.service";
import { addWalletAction, setDecryptedKeyAction } from "../store/data.slice";
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
  const setDecryptedKey = (args: {
    walletAddress: string;
    decryptedKey: string | null;
  }) => dispatch(setDecryptedKeyAction(args));
  return { addWallet, setDecryptedKey };
}
