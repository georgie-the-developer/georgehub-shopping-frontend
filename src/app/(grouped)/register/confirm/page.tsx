"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonForm from "@/components/buttons/ButtonForm";
import ButtonLink from "@/components/buttons/ButtonLink";
// Styling
import confirm from "@/styles/modules/login.module.scss";
interface LoginFormInput {
  username: string;
  password: string;
}

export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const data = JSON.stringify(Object.fromEntries(params.entries()));
    console.log(data);
    // let csrfToken = "";
    // let response = await fetch("/someurl", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": csrfToken,
    //   },
    //   body: data,
    // });
    // let responseData: JSON = await response.json();
    // console.log(responseData);
    e.target.reset();
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
