import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { GenerateWalletModal } from "../components/core/GenerateWalletModal";
import { setupStore } from "../store";
import { preloadedState, renderWithProviders } from "../utils/test.util";

const store = setupStore(preloadedState);
const component = <GenerateWalletModal />;

jest.mock("browser-passworder", () => ({
  __esModule: true,
  default: {
    encrypt: () => Promise.resolve(),
  },
}));

describe("GenerateWalletModal component", () => {
  it("should show Required field error", () => {
    renderWithProviders(component);

    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("should add new wallet to store", async () => {
    renderWithProviders(component, { store });

    const submitBtn = screen.getByText("Submit");
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "123" } }); // put any value to pass validation
    fireEvent.click(submitBtn);
    await new Promise((r) => setTimeout(r, 2000));

    await waitFor(() => {
      const wallets = Object.values(store.getState().data.wallets);
      expect(wallets.length).toBe(
        Object.values(preloadedState.data.wallets).length + 1
      );
    });
  });
});
