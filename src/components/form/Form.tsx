// Imports
import { ReactElement, ReactNode, useEffect, useState } from "react";
import form from "@/styles/modules/form.module.scss";
import { FormProvider, useForm } from "@/contexts/FormContext";

// Custom types
type FormType = {
  children: ReactNode;
  handleSubmit: (e) => void;
};
type FormInputType = {
  type: "text" | "password" | "number";
  label: string;
  name: string;
  pattern?: string;
  patternMessage?: string;
  placeholder: string;
  required: boolean;
};

type FormLinkType = {
  title: string;
  link: string;
};

type FormSubmitType = {
  value: string;
};

// Main component
export function Form({ children, handleSubmit }: FormType) {
  return (
    <form onSubmit={handleSubmit} className={form.container}>
      <FormProvider>{children}</FormProvider>
    </form>
  );
}

// input component
export function FormInput({
  type,
  label,
  name,
  placeholder,
  pattern = "",
  patternMessage = "",
  required,
}: FormInputType) {
  const { formErrors, addError, removeError } = useForm();
  const checkPattern = (e) => {
    e.preventDefault();
    if (pattern) {
      if (!e.target.value.match(pattern)) {
        addError(name, patternMessage);
      } else {
        removeError(name);
      }
    }
  };
  return (
    <div className={form.inputContainer}>
      <label htmlFor={name} className={form.label}>
        {label}
      </label>
      <input
        type={type}
        className={form.input}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={checkPattern}
        required={required}
      />
      {formErrors[name] && (
        <div className={form.inputError}>{formErrors[name]}</div>
      )}
    </div>
  );
}

// link component
export function FormLink({ title, link }: FormLinkType) {
  return (
    <div className={form.linkContainer}>
      <a href={link} className={form.link}>
        {title}
      </a>
    </div>
  );
}

// submit component
export function FormSubmit({ value }: FormSubmitType) {
  const { isSubmittable } = useForm();
  return (
    <div className={form.submitContainer}>
      <input
        type="submit"
        value={value}
        className={`${form.button} ${!isSubmittable && form.disabeled}`}
        disabled={!isSubmittable}
      />
    </div>
  );
}
