"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
//Navigation
// Styling
import register from "@/styles/modules/login.module.scss";
interface LoginFormInput {
  username: string;
  password: string;
}

export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value.toString());
    }
    window.location.href = `/register/confirm?${params.toString()}`;
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
            name="card_number"
            label="Credit/debit card number"
            placeholder="Enter your card number"
            pattern="{4,}$"
            patternMessage="Full name should be at least 4 characters long."
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
          <Form.FormSubmit value="Submit" />
        </Form.Form>
      </div>
      <div className={register.textContainer}>Already signed up?</div>
      <div className={register.buttonLinkContainer}>
        <ButtonLink link="login" text="Login" type="secondary" />
      </div>
    </div>
  );
}
