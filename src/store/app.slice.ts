import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { IAppStore } from "../domain/interfaces/store.interface";

export const initialAppState: IAppStore = {
  modal: {
    component: null,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    showModal: (state, { payload, type }: PayloadAction<ReactNode>) => {
      if (payload) {
        state.modal.component = payload;
      } else {
        console.error("showModal payload is empty");
      }
    },
    hideModal: (state) => {
      state.modal.component = null;
    },
  },
});

export const { showModal: showModalAction, hideModal: hideModalAction } =
  appSlice.actions;

export const appSliceReducer = appSlice.reducer;
