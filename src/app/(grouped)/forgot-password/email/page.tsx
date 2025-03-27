"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
// Hooks
import { useTransition } from "react";
// Contexts
import { useAlert } from "@/contexts/AlertContext";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";
// Helpers
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
// Styling
import forgotPassword from "@/styles/modules/login.module.scss";

export default function Page() {
  useLimitAccessByRole(["guest"]);
  const { showAlert } = useAlert();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value.toString());
    }
    // Redirect to next stage
    let email = e.target["email"].value;
    startTransition(async () => {
      try {
        let success = requestConfirmCode(e.target["email"].value);
        if (success) {
          window.location.href = `/forgot-password/change-password?${params.toString()}`;
        } else {
          showAlert("Error sending confirmation code");
        }
      } catch (e) {
        console.log(e);
        showAlert(
          "Fetch error. If the issue persists, enable third-party cookies for this website"
        );
      }
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
