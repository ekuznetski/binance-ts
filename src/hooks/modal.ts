import { IModal } from "../domain/interfaces/modal.interface";
import { hideModalAction, showModalAction } from "../store/app.slice";
import { useTypedDispatch, useTypedSelector } from "./storeHooks";

export function useModalDispatch() {
  const dispatch = useTypedDispatch();
  const showModal = (component: IModal["component"]) => {
    if (component) dispatch(showModalAction(component));
  };
  const hideModal = () => dispatch(hideModalAction());
  return { showModal, hideModal };
}

export function useModalSelector() {
  return useTypedSelector((state) => state.app.modal);
}
