import { configureStore } from "@reduxjs/toolkit";
import { appSliceReducer } from "./app.slice";
import { dataSliceReducer } from "./data.slice";

export const store = configureStore({
  reducer: {
    app: appSliceReducer,
    data: dataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
