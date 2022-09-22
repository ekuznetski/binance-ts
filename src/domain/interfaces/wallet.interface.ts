export interface IWallet {
  address: string;
  encryptedKey: string;
  decryptedKey?: string | null;
}
