import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "../store";

export const useTypedDispatch: () => typeof store.dispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
