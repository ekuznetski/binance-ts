import { fireEvent, screen, waitFor } from "@testing-library/react";
import passworder from "browser-passworder";
import React from "react";
import { RevealKeyModal } from "../components/core/RevealKeyModal";
import { setupStore } from "../store";
import {
  mockedWallets,
  preloadedState,
  renderWithProviders,
} from "../utils/test.util";

const store = setupStore(preloadedState);
const firstMockedWallet =
  mockedWallets["0x327105eD4eEB06709809d657bBdD0900Bab0752A"];
const component = <RevealKeyModal wallet={firstMockedWallet} />;
const mockedDecryptedKey = "mockedDecryptedKey";

jest.mock("browser-passworder", () => ({
  __esModule: true,
  default: {
    decrypt: jest.fn(),
  },
}));

describe("RevealKeyModal component", () => {
  it("should show Required field error", () => {
    renderWithProviders(component);

    passworder.decrypt.mockImplementation(() =>
      Promise.resolve(mockedDecryptedKey)
    );
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("should show Incorrect password error", async () => {
    renderWithProviders(component);

    passworder.decrypt.mockImplementation(() => Promise.reject());
    const submitBtn = screen.getByText("Submit");
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "123123" } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText("Incorrect password")).toBeInTheDocument();
    });
  });

  it("should add decrypted key to store", async () => {
    renderWithProviders(component, { store });

    passworder.decrypt.mockImplementation(() =>
      Promise.resolve(mockedDecryptedKey)
    );

    const submitBtn = screen.getByText("Submit");
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "123" } }); // put any value to pass validation
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        store.getState().data.wallets[firstMockedWallet.address].decryptedKey
      ).toBe(mockedDecryptedKey);
    });
  });
});
