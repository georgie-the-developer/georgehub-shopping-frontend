"use client";
import { useAlert } from "@/contexts/AlertContext";
import CloseSvg from "/assets/icons/close.svg";
import alertStyling from "@/styles/modules/alert.module.scss";
export default function Alert() {
  const { alert, closeAlert } = useAlert();
  if (!alert) return null;

  return (
    <div className={alertStyling.container}>
      <div className={alertStyling.messageContainer}>
        <span className={alertStyling.message}>{alert}</span>
      </div>
      <div className={alertStyling.iconContainer}>
        <div
          className={alertStyling.closeContainer}
          onClick={() => closeAlert()}
        >
          <CloseSvg />
        </div>
      </div>
    </div>
  );
}
