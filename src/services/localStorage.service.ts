import { IWallet } from "../domain/interfaces/wallet.interface";

function read(): any {
  const res = localStorage.getItem("wallets");
  return res ? JSON.parse(res) : {};
}

function write(wallet: IWallet): void {
  const data = read();
  data[wallet.address] = wallet;
  localStorage.setItem("wallets", JSON.stringify(data));
}
export const localStorageService = {
  read,
  write,
};
