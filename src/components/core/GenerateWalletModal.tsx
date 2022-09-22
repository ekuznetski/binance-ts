import passworder from "browser-passworder";
import { ethers } from "ethers";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useModalDispatch } from "../../hooks/modal";
import { useWalletDispatch } from "../../hooks/wallet";
import Button from "../shared/Button";
import Input from "../shared/Input";

// probably make sense to create one modal and pass handlers and some logic by props to avoid code duplicates

export const GenerateWalletModal = styled((props) => {
  const { hideModal } = useModalDispatch();
  const { addWallet } = useWalletDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const generateWallet = async () => {
    const password = ref.current?.value;
    if (password) {
      const wallet = ethers.Wallet.createRandom();
      const hashedKey = await passworder.encrypt(password, wallet.privateKey);
      addWallet({
        address: wallet.address,
        hashedKey,
      });
      hideModal();
    } else {
      setError("Required field");
    }
  };

  return (
    <div {...props}>
      <div className="modalTitle">Type password to generate new wallet</div>
      <Input
        label="Password"
        type="password"
        ref={ref}
        autoFocus
        error={error}
      />
      <div className="buttons">
        <Button onClick={generateWallet}>Submit</Button>
        <Button $secondary onClick={hideModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
})`
  width: 400px;
  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .modalTitle {
    margin-bottom: 20px;
    text-align: center;
  }
`;
