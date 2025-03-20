import React from "react";
import buttonForm from "@/styles/modules/button-form.module.scss";
type ButtonFromType = {
  action: () => void;
  value: string;
};
export default function ButtonForm({ action, value }: ButtonFromType) {
  return (
    <input
      type="button"
      className={buttonForm.button}
      onClick={action}
      value={value}
    />
  );
}
