"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
import ButtonForm from "@/components/buttons/ButtonForm";
// Hooks
import { useTransition } from "react";
//Contexts
import { useAlert } from "@/contexts/AlertContext";
// Helpers
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import { requestConfirmCode } from "@/helpers/request-confirmation-code";
// Config
import config from "config.json";
// Styling
import register from "@/styles/modules/login.module.scss";

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
    startTransition(async () => {
      try {
        let success = requestConfirmCode(e.target["email"].value);
        if (success) {
          window.location.href = `/register/confirm?${params.toString()}`;
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
  const checkUsernameAvailability = async () => {
    let username = (document.getElementById("username") as HTMLInputElement)
      .value;
    if (!username) {
      showAlert("You haven't provided any value");
      return;
    }
    let url = config.API_URL + "auth/check-username/" + username;
    let res = await fetch(url);
    let data = await res.json();
    showAlert(data.message);
  };
  return (
    <div className={register.container}>
      <div className={register.heading}>Register to GeorgeHub Shopping</div>
      <div className={register.formContainer}>
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
          <Form.FormInput
            type="text"
            name="username"
            label="Username"
            placeholder="Create a username"
            pattern="^[^\s]{4,}$"
            patternMessage="The username should be at least 4 characters long."
            required={true}
          />
          <div className={register.buttonFormContainer}>
            <div className={register.buttonContainer}>
              <ButtonForm
                action={checkUsernameAvailability}
                value="Check availability"
              />
            </div>
          </div>
          <Form.FormInput
            type="text"
            name="address"
            label="Address"
            placeholder="Enter your address"
            pattern=""
            patternMessage=""
            required={true}
          />
          <Form.FormInput
            type="text"
            name="full_name"
            label="Full name"
            placeholder="Enter your full name"
            pattern=".{4}$"
            patternMessage="Full name should be at least 4 characters long."
            required={true}
          />
          <Form.FormInput
            type="text"
            pattern="^(\d{4} \d{4} \d{4} \d{4})$"
            patternMessage="Please follow the credit card pattern"
            name="card_number"
            label="Credit/debit card number"
            placeholder="Enter your card number"
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
          <div className={register.termsContainer}>
            <Form.FormCheckbox
              label={"I agree to the"}
              name={"terms_agreement"}
              required={true}
            />
            <div className={register.linksContainer}>
              <Form.FormLink title="Terms of service" link="#" />
              <span>and</span>
              <Form.FormLink title="Privacy policy" link="#" />
            </div>
          </div>
          <Form.FormSubmit value="Submit" isPending={isPending} />
        </Form.Form>
      </div>
      <div className={register.textContainer}>Already signed up?</div>
      <div className={register.buttonLinkContainer}>
        <ButtonLink link="/login" text="Login" type="secondary" />
      </div>
    </div>
  );
}
