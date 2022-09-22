import { IModal } from "./modal.interface";
import { IWallet } from "./wallet.interface";

export interface IDataStore {
  wallets: { [key: string]: IWallet };
}

export interface IAppStore {
  modal: IModal;
}
