import { IModal } from "./modal.interface";
import { IWallet } from "./wallet.interface";

export interface IDataStore {
  wallets: IWallet[];
}

export interface IAppStore {
  modal: IModal;
}
