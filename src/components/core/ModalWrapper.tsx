import styled from "styled-components";
import { useModalDispatch, useModalSelector } from "../../hooks/modal";

const ModalWrapper = styled((props) => {
  const modal = useModalSelector();
  const { hideModal } = useModalDispatch();
  return modal.component ? (
    <div {...props}>
      <div className="overlay" />
      <div className="modalInner">
        <div className="close" onClick={hideModal} />
        <>{modal.component}</>
      </div>
    </div>
  ) : null;
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .close {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 5px;
    transition: transform 0.2s;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 5px;
      left: 15px;
      width: 1px;
      height: 20px;
      background-color: black;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
  }

  .modalInner {
    max-width: 90vh;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 40px 20px 20px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default ModalWrapper;
