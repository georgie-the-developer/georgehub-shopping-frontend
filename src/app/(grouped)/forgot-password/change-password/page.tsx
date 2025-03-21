"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
import ButtonForm from "@/components/buttons/ButtonForm";
// Helpers
import { limitAccesByRole } from "@/helpers/auth-middleware";
// Styling
import forgotPassword from "@/styles/modules/login.module.scss";

export default function Page() {
  limitAccesByRole(["guest"]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = JSON.stringify(Object.fromEntries(formData));
    //Send verification code...
    console.log(data);
    e.target.reset();
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
          <Form.FormSubmit value="Save" />
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
