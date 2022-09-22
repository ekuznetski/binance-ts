export interface IWallet {
  address: string;
  hashedKey: string;
  unhashedKey?: string | null;
}
