import React from "react";
import welcome from "@/styles/modules/welcome.module.scss";
import ButtonLink from "@/components/buttons/ButtonLink";
export default function Page() {
  return (
    <div className={welcome.container}>
      <div className={welcome.heading}>Welcome to GeorgeHub Shopping!</div>
      <div className={welcome.buttonGroup}>
        <ButtonLink link="/login" text="Login" type="secondary" />
        <fieldset>
          <legend>Or</legend>
        </fieldset>
        <ButtonLink link="/register" text="Register" type="primary" />
      </div>
    </div>
  );
}
