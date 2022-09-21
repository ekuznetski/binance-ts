import { ReactNode } from "react";

export interface IModal<T = ReactNode> {
  component: T;
}
