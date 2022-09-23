import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

export const Button = styled(
  ({
    children,
    ...props
  }: PropsWithChildren<
    {
      $secondary?: boolean;
    } & ButtonHTMLAttributes<HTMLButtonElement>
  >) => {
    return <button {...props}>{children}</button>;
  }
)`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid;
  cursor: pointer;
  background-color: ${({ $secondary }) => ($secondary ? "#FFFFFF" : "#5090fc")};
  color: ${({ $secondary }) => ($secondary ? "#5090fc" : "#FFFFFF")};
  border-color: ${({ $secondary }) =>
    $secondary ? "#5090fc:" : "transparent"};
  box-shadow: 0 2px 5px 0 rgba(80, 144, 252, 0.5);
  transition: all 0.2s;
  width: 100%;
  &:hover {
    background-color: ${({ $secondary }) =>
      $secondary ? "#FFFFFF" : "#4174cb"};
    box-shadow: 0 1px 3px 0 rgba(80, 144, 252, 0.5);
  }
  &:active {
    background-color: ${({ $secondary }) =>
      $secondary ? "#FFFFFF" : "#345b9f"};
    box-shadow: 0 2px 5px 0 rgba(80, 144, 252, 0.5) inset;
  }
`;
