"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
// Hooks
import { startTransition, useTransition } from "react";
// Contexts
import { useAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
// Helpers
import { getCookie } from "@/helpers/cookies";
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
// Navigation
import { redirect } from "next/navigation";
// Config
import config from "config.json";
// Styling
import loginStyling from "@/styles/modules/login.module.scss";

export default function Page() {
  useLimitAccessByRole(["guest"]);
  const { showAlert } = useAlert();
  const { login } = useUser();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = JSON.stringify(Object.fromEntries(formData));
    startTransition(async () => {
      try {
        let csrfToken = getCookie("csrf_token");
        let url = config.API_URL + "auth/login";
        let res = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: data,
        });
        let resData = await res.json();
        if (res.ok) {
          showAlert("Login successfull");
          e.target.reset();
          login();
          startTransition(async () => {
            redirect("/home");
          });
        } else {
          showAlert("Login error");
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
    <div className={loginStyling.container}>
      <div className={loginStyling.heading}>Login to GeorgeHub Shopping</div>
      <div className={loginStyling.formContainer}>
        <Form.Form handleSubmit={handleSubmit}>
          <Form.FormInput
            type="text"
            name="username"
            label="Email or username"
            placeholder="Enter your email or username"
            pattern="^[^\s]{4,}$"
            patternMessage="Username should contain at least 4 characters and must not contain whitespaces."
            required={true}
          />
          <Form.FormInput
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^\s]{8,}$"
            patternMessage="Password should be at least 8 characters long, include at least one digit, one lowercase, and one uppercase letter, and must not contain any whitespaces."
            required={true}
          />
          <Form.FormSubmit value="Submit" isPending={isPending} />
          <Form.FormLink
            title="Forgot password?"
            link="/forgot-password/email"
          />
        </Form.Form>
      </div>
      <div className={loginStyling.textContainer}>
        Don't have an account yet?
      </div>
      <div className={loginStyling.buttonLinkContainer}>
        <ButtonLink link="/register" text="Register" type="secondary" />
      </div>
    </div>
  );
}
