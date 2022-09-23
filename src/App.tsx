import React from "react";
import { Provider } from "react-redux";
import { WalletsWrapper } from "./components/core/WalletsWrapper";
import { setupStore } from "./store";

export function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <WalletsWrapper />
    </Provider>
  );
}
