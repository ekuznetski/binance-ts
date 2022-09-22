import { IWallet } from "../domain/interfaces/wallet.interface";
import { addWalletAction } from "../store/data.slice";
import localStorageService from "../utils/localStorage.service";
import { useTypedDispatch, useTypedSelector } from "./storeHooks";

export function useWalletSelector() {
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
  return { addWallet }; // i prefer to keep same return pattern in all hooks - dispatcher could have few elements, so we can return object, while selector always will return only one element
}
