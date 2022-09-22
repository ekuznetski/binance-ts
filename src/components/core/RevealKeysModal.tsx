import passworder from "browser-passworder";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IWallet } from "../../domain/interfaces/wallet.interface";
import { useModalDispatch } from "../../hooks/modal";
import { useWalletDispatch } from "../../hooks/wallet";
import Button from "../shared/Button";
import Input from "../shared/Input";

export const RevealKeysModal = styled(
  ({ wallet, ...props }: { wallet: IWallet }) => {
    const { hideModal } = useModalDispatch();
    const { setDecryptedKey } = useWalletDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const onClickHandler = () => {
      const password = ref.current?.value;
      if (password) {
        passworder
          .decrypt(password, wallet.encryptedKey)
          .then((decryptedKey) => {
            setDecryptedKey({
              walletAddress: wallet.address,
              decryptedKey: decryptedKey,
            });
            hideModal();
          })
          .catch(() => {
            setError("Incorrect password");
          });
      } else {
        setError("Required field");
      }
    };

    return (
      <div {...props}>
        <div className="modalTitle">
          Type password to show Private Key for wallet <i>{wallet.address}</i>
        </div>
        <Input
          label="Password"
          type="password"
          ref={ref}
          autoFocus
          error={error}
        />
        <div className="buttons">
          <Button onClick={onClickHandler}>Submit</Button>
          <Button $secondary onClick={hideModal}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
)`
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
