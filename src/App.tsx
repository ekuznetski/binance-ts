import React from "react";
import { Provider } from "react-redux";
import WalletsWrapper from "./components/core/WalletsWrapper";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <WalletsWrapper />
    </Provider>
  );
}

export default App;
