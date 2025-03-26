"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
// Hooks
import { useTransition } from "react";
// Config
import config from "config.json";
// Helpers
import { limitAccesByRole } from "@/helpers/auth-middleware";
import { getCookie } from "@/helpers/cookies";
// Styling
import forgotPassword from "@/styles/modules/login.module.scss";

export default function Page() {
  limitAccesByRole(["guest"]);
  const [isPending, startTransition] = useTransition();
  const requestConfirmCode = async (email: string) => {
    let url = config.API_URL + "auth/confirmation-code";
    let csrf_token = getCookie("csrf_token");
    console.log(csrf_token);
    let res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrf_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    let data = await res.json();
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value.toString());
    }
    // Redirect to next stage
    let email = e.target["email"].value;
    console.log(email);
    startTransition(async () => {
      requestConfirmCode(email);
      window.location.href = `/forgot-password/change-password?${params.toString()}`;
    });
  };
  return (
    <div className={forgotPassword.container}>
      <div className={forgotPassword.heading}>Reset your password</div>
      <div className={forgotPassword.heading}>
        1. Send verification code to your email
      </div>
      <div className={forgotPassword.formContainer}>
        <Form.Form handleSubmit={handleSubmit}>
          <Form.FormInput
            type="text"
            name="email"
            label="Email"
            placeholder="Enter your email"
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            patternMessage="The entry should folow the email pattern."
            required={true}
          />
          <Form.FormSubmit value="Send reset code" isPending={isPending} />
        </Form.Form>
      </div>
      <div className={forgotPassword.textContainer}>Got here by accident?</div>
      <div className={forgotPassword.buttonLinkContainer}>
        <ButtonLink link="/login" text="Back to Login" type="secondary" />
      </div>
    </div>
  );
}
