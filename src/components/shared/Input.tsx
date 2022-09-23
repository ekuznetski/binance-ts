import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import styled from "styled-components";

export const Input = styled(
  forwardRef(
    (
      {
        label,
        error,
        className,
        ...props
      }: PropsWithChildren<
        {
          label: string;
          error?: string | null;
        } & InputHTMLAttributes<HTMLInputElement>
      >,
      ref: ForwardedRef<HTMLInputElement>
    ) => {
      const id = "input-" + Math.random();
      return (
        <div className={className}>
          <input id={id} {...props} ref={ref} placeholder={"empty"} />
          <div className="error">{error}</div>
          <label htmlFor={id}>{label}</label>
        </div>
      );
    }
  )
)`
  position: relative;

  label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;
    color: rgba(17, 17, 17, 0.48);
    transition: all 0.2s;
    pointer-events: none;
  }
  .error {
    position: absolute;
    font-size: 12px;
    color: #ff3b3b;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
    padding: 22px 19px 6px;
    border-radius: 5px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05%);
    border: 1px solid ${({ error }) => (error ? "#ff3b3b" : "#cacfd5")};
    transition: all 0.2s;

    &::placeholder {
      color: transparent; // this trick allow us to use :placeholder-shown
    }

    &:hover {
      box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.07);
    }

    &:focus {
      border-color: #5090fc;
      box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
      outline: none;
    }

    &:focus,
    &:not(:placeholder-shown) {
      & ~ label {
        top: 12px;
        left: 10px;
        font-size: 14px;
      }
    }
  }
`;
