"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonForm from "@/components/buttons/ButtonForm";
import ButtonLink from "@/components/buttons/ButtonLink";
// Hooks
import { useTransition } from "react";
// Contexts
import { useAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
// Routing
import { redirect } from "next/navigation";
// Helpers
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { getCookie } from "@/helpers/cookies";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";
// Config
import config from "config.json";
// Styling
import confirm from "@/styles/modules/login.module.scss";

export default function Page() {
  useLimitAccessByRole(["guest"]);
  const { login } = useUser();
  const { showAlert } = useAlert();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    let objData = Object.fromEntries(params.entries());
    objData["confirmation_code"] = e.target["confirm_code"].value;
    const data = JSON.stringify(objData);
    startTransition(async () => {
      try {
        let csrfToken = getCookie("csrf_token");
        let url = config.API_URL + "auth/register";
        let response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: data,
        });
        let responseData = await response.json();
        if (!response.ok) {
          showAlert(responseData.message);
        } else {
          e.target.reset();
          showAlert("Registered succsessfully");
          login();
          startTransition(async () => {
            redirect("/home");
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
  const handleResendCode = async () => {
    const params = new URLSearchParams(window.location.search);
    const email = Object.fromEntries(params).email;
    if (!email) {
      showAlert("No email specified. Go back and specify the email again");
      return;
    }
    requestConfirmCode(email);
    showAlert("Code has been sent");
  };
  return (
    <div className={confirm.container}>
      <div className={confirm.heading}>Help us beat scammers</div>
      <div className={confirm.formContainer}>
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
          <Form.FormSubmit value="Submit" isPending={isPending} />
          <div className={confirm.buttonFormContainer}>
            <div className={confirm.buttonContainer}>
              <ButtonForm action={handleResendCode} value="Resend code" />
            </div>
          </div>
        </Form.Form>
      </div>
      <div className={confirm.textContainer}>
        Wrong email or forgot something?
      </div>
      <div className={confirm.buttonLinkContainer}>
        <ButtonLink link="/register" text="Back to Register" type="secondary" />
      </div>
    </div>
  );
}
