"use client";
// Components
import * as Form from "@/components/form/Form";
import ButtonLink from "@/components/buttons/ButtonLink";
// Config
import config from "config.json";
// Styling
import login from "@/styles/modules/login.module.scss";
import { getCookie } from "@/helpers/cookies";
import { useAlert } from "@/contexts/AlertContext";
import { redirect } from "next/navigation";
export default function Page() {
  const { showAlert } = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = JSON.stringify(Object.fromEntries(formData));
    console.log(data);
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
      setTimeout(() => {
        redirect("/home");
      }, 1000);
    } else {
      showAlert("Login error");
    }
    console.log(resData);
  };
  return (
    <div className={login.container}>
      <div className={login.heading}>Login to GeorgeHub Shopping</div>
      <div className={login.formContainer}>
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
          <Form.FormSubmit value="Submit" />
          <Form.FormLink
            title="Forgot password?"
            link="/forgot-password/email"
          />
        </Form.Form>
      </div>
      <div className={login.textContainer}>Don't have an account yet?</div>
      <div className={login.buttonLinkContainer}>
        <ButtonLink link="/register" text="Register" type="secondary" />
      </div>
    </div>
  );
}
