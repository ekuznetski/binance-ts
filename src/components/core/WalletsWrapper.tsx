import React from "react";
import styled from "styled-components";
import { useModalDispatch } from "../../hooks/modal";
import { useWalletsSelector } from "../../hooks/wallet";
import Button from "../shared/Button";
import { GenerateWalletModal } from "./GenerateWalletModal";
import ModalWrapper from "./ModalWrapper";
import Wallet from "./Wallet";

const WalletsList = styled((props) => {
  const wallets = useWalletsSelector();
  const walletsArr = Object.values(wallets);
  console.log(wallets, walletsArr);
  return (
    <div {...props}>
      {walletsArr.length ? (
        walletsArr.map((wallet) => (
          <Wallet key={wallet.address} wallet={wallet} />
        ))
      ) : (
        <div className={"noWallets"}>No wallets</div>
      )}
    </div>
  );
})`
  .noWallets {
    text-align: center;
    margin-top: 40px;
  }
`;

const WalletsWrapper = styled((props) => {
  const { showModal } = useModalDispatch();

  const generateWalletHandler = () => {
    showModal(<GenerateWalletModal />);
  };
  return (
    <div {...props}>
      <Button onClick={generateWalletHandler}>Generate new wallet</Button>
      <WalletsList />
      <ModalWrapper />
    </div>
  );
})`
  > ${Button} {
    width: fit-content;
  }

  max-width: 1300px;
  padding: 20px;
  margin: auto;
`;
export default WalletsWrapper;
