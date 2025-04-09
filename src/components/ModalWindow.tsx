import { ReactNode } from "react";
import modalWindow from "@/styles/modules/modal-window.module.scss";
export default function ModalWindow({ children }: { children: ReactNode }) {
  return (
    <div className={modalWindow.container}>
      <div className={modalWindow.overlay}></div>
      <div className={modalWindow.card}>{children}</div>
    </div>
  );
}
