"use client";
// Hooks
import { useState } from "react";
// Components
import * as Form from "@/components/form/Form";
// Styling
import login from "@/styles/modules/login.module.scss";

interface LoginFormInput {
  username: string;
  password: string;
}

export default function Page() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = JSON.stringify(Object.fromEntries(formData));
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
          <Form.FormLink title="Forgot password?" link="/forgot-password" />
        </Form.Form>
      </div>
    </div>
  );
}
