import passworder from "browser-passworder";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IWallet } from "../../domain/interfaces/wallet.interface";
import { useModalDispatch } from "../../hooks/modal";
import Button from "../shared/Button";
import { RevealKeysModal } from "./RevealKeysModal";

const Wallet = styled(({ wallet, ...props }: { wallet: IWallet }) => {
  const { showModal } = useModalDispatch();
  const [privateKey, setPrivateKey] = useState(null);

  const revealKey = (password: string) => {
    return new Promise<boolean>((resolve, reject) => {
      passworder
        .decrypt(password, wallet.hashedPrivateKey)
        .then((e) => {
          setPrivateKey(e);
          resolve(true);
        })
        .catch((e) => {
          reject(false);
        });
    });
  };

  const showKeyHandler = () => {
    showModal(<RevealKeysModal address={wallet.address} cb={revealKey} />);
  };
  const hideKeyHandler = () => {
    setPrivateKey(null);
  };
  const network = "rinkeby";
  const provider = ethers.getDefaultProvider(network);
  const [balance, setBalance] = useState("loading");
  useEffect(() => {
    provider.getBalance(wallet.address).then((balance) => {
      setBalance(ethers.utils.formatEther(balance));
    });
  }, [provider, wallet.address]);

  return (
    <div {...props}>
      <div>{wallet.address}</div>
      <div>{balance}</div>
      <div>
        {privateKey ??
          "***********************************************************************************"}
      </div>
      <div>
        <Button
          $secondary
          onClick={privateKey ? hideKeyHandler : showKeyHandler}
        >
          {privateKey ? "Hide key" : "Reveal key"}
        </Button>
      </div>
    </div>
  );
})`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  transition: background-color 0.2s;

  > div:nth-child(1) {
    width: 400px;
  }

  > div:nth-child(2) {
    width: 150px;
  }

  > div:nth-child(3) {
    width: 600px;
  }
  > div:nth-child(4) {
    width: 150px;
  }

  &:hover {
    background-color: rgba(255, 222, 173, 0.3);
  }
`;

export default Wallet;
