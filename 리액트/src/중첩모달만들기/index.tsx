import React, { ElementRef, useRef } from "react";
import { ModalContext, useModalContext } from "./context";

export default function 중첩모달만들기({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <ModalContext.Provider value={{ dialogRef, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

중첩모달만들기.Content = function Content({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dialogRef } = useModalContext();

  return (
    <dialog ref={dialogRef} className="backdrop:bg-black/20">
      {children}
    </dialog>
  );
};

중첩모달만들기.Cancel = function Cancel() {
  const { close } = useModalContext();
  return <button onClick={close}>close</button>;
};

중첩모달만들기.Trigger = function Trigger() {
  const { open } = useModalContext();
  return <button onClick={open}>open</button>;
};
