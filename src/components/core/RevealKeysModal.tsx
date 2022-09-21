import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useModalDispatch } from "../../hooks/modal";
import Button from "../shared/Button";
import Input from "../shared/Input";

export const RevealKeysModal = styled(
  ({
    address,
    cb,
    ...props
  }: {
    address: string;
    cb: (val: string) => Promise<boolean>;
  }) => {
    const { hideModal } = useModalDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const onclickHandler = () => {
      const password = ref.current?.value;
      if (password) {
        cb(password)
          .then(() => {
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
          Type password to show Private Key for wallet <i>{address}</i>
        </div>
        <Input
          label="Password"
          type="password"
          ref={ref}
          autoFocus
          error={error}
        />
        <div className="buttons">
          <Button onClick={onclickHandler}>Submit</Button>
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
