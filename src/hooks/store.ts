import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IDispatch, ISelector } from "../store";

export const useTypedDispatch: () => IDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<ReturnType<ISelector>> =
  useSelector;
