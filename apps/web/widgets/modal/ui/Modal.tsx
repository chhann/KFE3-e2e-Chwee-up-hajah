import { useRef } from 'react';

export const Modal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  // classname, children, onClick
  return (
    <dialog ref={dialogRef}>
      <button onClick={() => {}}>label</button>
    </dialog>
  );
};
