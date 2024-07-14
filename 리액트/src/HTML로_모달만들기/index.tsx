import { ElementRef, useRef } from "react";

export default function HTML로_모달만들기({
  children,
}: {
  children?: React.ReactNode;
}) {
  const ref = useRef<ElementRef<"dialog">>(null);
  return (
    <>
      <dialog ref={ref} className="backdrop:bg-black/85">
        {children}
        <p>여러분 안녕하세요~!</p>
        <menu className="list-none">
          <li>
            <button onClick={() => ref.current?.close()}>close</button>
          </li>
        </menu>
      </dialog>
      <button onClick={() => ref.current?.showModal()}>open</button>
    </>
  );
}
