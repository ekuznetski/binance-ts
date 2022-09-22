import { screen, waitFor } from "@testing-library/react";
import React from "react";
import Wallet from "../components/core/Wallet";
import { mockedWallets, renderWithProviders } from "../utils/test.util";

const firstMockedWallet =
  mockedWallets["0x327105eD4eEB06709809d657bBdD0900Bab0752A"];

describe("Wallet component", () => {
  it("should render balance", async () => {
    renderWithProviders(<Wallet wallet={firstMockedWallet} />);
    await waitFor(
      () => {
        expect(screen.getByText("0.0000001 ETH")).toBeInTheDocument();
      },
      {
        timeout: 5000,
      }
    );
  });

  it("should render decrypted key and hide key button", async () => {
    renderWithProviders(
      <Wallet
        wallet={{
          ...firstMockedWallet,
          decryptedKey: "mockedDecryptedKey",
        }}
      />
    );
    expect(screen.getByText("mockedDecryptedKey")).toBeInTheDocument();
    expect(screen.getByText("Hide key")).toBeInTheDocument();
  });
});
