"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
import ButtonForm from "@/components/buttons/ButtonForm";
// Hooks
import { useTransition } from "react";
// Contexts
import { useAlert } from "@/contexts/AlertContext";
// Config
import config from "config.json";
// Helpers
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { getCookie } from "@/helpers/cookies";
// Styling
import forgotPassword from "@/styles/modules/login.module.scss";
import { redirect, useSearchParams } from "next/navigation";

export default function Page() {
  useLimitAccessByRole(["guest"]);
  const { showAlert } = useAlert();
  const [isPending, startTransition] = useTransition();
  let searchParams = useSearchParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      confirmation_code: e.target["confirm_code"].value,
      new_password: e.target["new_password"].value,
      email: searchParams.get("email"),
    };
    startTransition(async () => {
      try {
        let url = config.API_URL + "auth/reset-password";
        let csrf_token = getCookie("csrf_token");
        let res = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrf_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let resJson = await res.json();
        showAlert(resJson.message);
        if (res.ok) {
          e.target.reset();
          startTransition(async () => {
            redirect("/login");
          });
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
        2. Confirm it's you and create a new password
      </div>
      <div className={forgotPassword.formContainer}>
        <Form.Form handleSubmit={handleSubmit}>
          <Form.FormInput
            type="number"
            name="confirm_code"
            label="Confirmation code"
            placeholder="Enter the confirm code that we sent to your email"
            pattern="^.{6}$"
            patternMessage="Confrim code should be 6 characters long"
            required={true}
          />
          <Form.FormInput
            type="password"
            name="new_password"
            label="Password"
            placeholder="Create a new password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^\s]{8,}$"
            patternMessage="Password should be at least 8 characters long, include at least one digit, one lowercase, and one uppercase letter, and must not contain any whitespaces."
            required={true}
          />
          <Form.FormSubmit value="Save" isPending={isPending} />
          <div className={forgotPassword.buttonFormContainer}>
            <div className={forgotPassword.buttonContainer}>
              <ButtonForm action={() => alert("hi")} value="Resend code" />
            </div>
          </div>
        </Form.Form>
      </div>
      <div className={forgotPassword.textContainer}>Wrong email?</div>
      <div className={forgotPassword.buttonLinkContainer}>
        <ButtonLink
          link="/forgot-password/email"
          text="Back to stage 1"
          type="secondary"
        />
      </div>
    </div>
  );
}
