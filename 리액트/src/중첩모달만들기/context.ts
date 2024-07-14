import { createContext, useContext } from "react";

interface IModalContextProps {
  open: () => void;
  close: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

export const ModalContext = createContext<IModalContextProps | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw Error("No Modal Context!");
  }
  return context;
};
