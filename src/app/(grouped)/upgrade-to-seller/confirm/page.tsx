"use client";
import confirm from "@/styles/modules/login.module.scss";
import * as Form from "@/components/form/Form";
import { useLimitAccessByRole } from "@/helpers/auth-middleware";
import ButtonForm from "@/components/buttons/ButtonForm";

export default function Page() {
  useLimitAccessByRole(["buyer"]);
  return (
    <div className={confirm.container}>
      <div className={confirm.heading}>Confirm upgrade</div>
      <div className={confirm.formContainer}>
        <Form.Form
          handleSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.FormInput
            type="number"
            name="confirm_code"
            label="Confirmation code"
            placeholder="Enter the confirm code that we sent to your email"
            pattern="^.{6}$"
            patternMessage="Confrim code should be 6 characters long"
            required={true}
          />
          <Form.FormSubmit value="Confirm upgrade" />
          <div className={confirm.buttonFormContainer}>
            <div className={confirm.buttonContainer}>
              <ButtonForm action={() => {}} value="Resend code" />
            </div>
          </div>
        </Form.Form>
      </div>
    </div>
  );
}
