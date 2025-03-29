import React, { useTransition } from "react";
import buttonForm from "@/styles/modules/button-form.module.scss";
type ButtonFromType = {
  action: () => void;
  value: string;
};
export default function ButtonForm({ action, value }: ButtonFromType) {
  const [isPending, startTransition] = useTransition();
  const handleAction = async () => {
    startTransition(async () => {
      action();
    });
  };
  return (
    <div
      className={`${buttonForm.container} ${
        isPending ? buttonForm.pending : ""
      }`}
    >
      <input
        type="button"
        className={buttonForm.button}
        onClick={handleAction}
        value={value}
      />
      <div className={buttonForm.spinnerContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
          <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
        </svg>
      </div>
    </div>
  );
}
