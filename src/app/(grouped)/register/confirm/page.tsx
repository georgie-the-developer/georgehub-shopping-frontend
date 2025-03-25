"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonForm from "@/components/buttons/ButtonForm";
import ButtonLink from "@/components/buttons/ButtonLink";
// Contexts
import { useAlert } from "@/contexts/AlertContext";
// Routing
import { redirect } from "next/navigation";
// Helpers
import { limitAccesByRole } from "@/helpers/auth-middleware";
// Config
import config from "config.json";
// Styling
import confirm from "@/styles/modules/login.module.scss";
import { getCookie } from "@/helpers/cookies";

export default function Page() {
  limitAccesByRole(["guest"]);
  const { showAlert } = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    let objData = Object.fromEntries(params.entries());
    objData["confirmation_code"] = e.target["confirm_code"].value;
    const data = JSON.stringify(objData)
    console.log(data);
    let csrfToken = getCookie("csrf_token");
    if (!csrfToken) {
      console.log("csrf_token no found");
    }
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
      console.log(responseData);
      e.target.reset();
      showAlert("Registered succsessfully");
      setTimeout(() => {
        redirect("/home");
      }, 2000);
    }
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
          <Form.FormSubmit value="Submit" />
          <div className={confirm.buttonFormContainer}>
            <div className={confirm.buttonContainer}>
              <ButtonForm action={() => alert("hi")} value="Resend code" />
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
