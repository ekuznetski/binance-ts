import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { appSliceReducer } from "./app.slice";
import { dataSliceReducer } from "./data.slice";

export const rootReducer = combineReducers({
  app: appSliceReducer,
  data: dataSliceReducer,
});

export function setupStore(preloadedState?: PreloadedState<IRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type IRootState = ReturnType<typeof rootReducer>;
export type IStore = ReturnType<typeof setupStore>;
export type IDispatch = IStore["dispatch"];
export type ISelector = IStore["getState"];
