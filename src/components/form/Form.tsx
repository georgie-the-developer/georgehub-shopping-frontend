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
  isPending?: boolean;
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

export function FormCheckbox({ label, name, required }) {
  return (
    <div className={form.checkboxContainer}>
      <input
        type="checkbox"
        className={form.checkbox}
        id={name}
        name={name}
        required={required}
      />
      <label htmlFor={name} className={form.checkboxLabel}>
        {label}
      </label>
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
export function FormSubmit({ value, isPending = false }: FormSubmitType) {
  const { isSubmittable } = useForm();
  return (
    <div className={`${form.submitContainer} ${isPending && form.pending}`}>
      <input
        type="submit"
        value={value}
        className={`${form.button} ${!isSubmittable && form.disabeled}`}
        disabled={!isSubmittable || isPending}
      />
      <div className={form.spinnerContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
          <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
        </svg>
      </div>
    </div>
  );
}
