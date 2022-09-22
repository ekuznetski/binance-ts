import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { IRootState, IStore, setupStore } from "../store";
import { initialAppState } from "../store/app.slice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<IRootState>;
  store?: IStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const mockedWallets = {
  "0x327105eD4eEB06709809d657bBdD0900Bab0752A": {
    address: "0x327105eD4eEB06709809d657bBdD0900Bab0752A",
    encryptedKey:
      '{"data":"hEaQzqXURJnPh0M4lFgWzxreBRYa6AqEuVxPRIZYThVaX1U473ORQ9yKRDbhDXhiNkx63JjsLeZVRTjb/Q51RnyG8cEbKYbW5xyxeY7My2B/XeI0","iv":"BMSCTKashpoCX45EuRiUvw==","salt":"Y492qRo2/v4TCYS9X0G3WOEniOng6MtJZyuj4Nr/7pg="}',
  },
  "0xC24066474C3Bb14e7Bad2b0AeC07aFF174A9B933": {
    address: "0xC24066474C3Bb14e7Bad2b0AeC07aFF174A9B933",
    encryptedKey:
      '{"data":"2KhMOjBI5M8xD5C8bIyTcoZiLjl0tO6tg49HuC/i10g6fgh8luJZfC+ReTzQrcCpOaXrs+nCf0egmkNEpgaP+8ErkrP0KnCgS13QbNOHfnrkP/2R","iv":"FjxxD6j+mLL9GpAeBmmFqQ==","salt":"j9hNiUg8PGtKgQHVJtCdqI4zyKjODZ7SJS/Jtx+ueCs="}',
  },
};

export const preloadedState = {
  data: {
    wallets: mockedWallets,
  },
  app: initialAppState,
};
