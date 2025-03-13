"use client"; // Needed in Next.js App Router for stateful components
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface FormContextType {
  isSubmittable: boolean;
  formErrors: {};
  addError: (name: string, message: string) => void;
  removeError: (name: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  // Errors
  const [formErrors, setFormErrors] = useState([]);
  const addError = (name: string, message: string) =>
    setFormErrors((prev) => ({ ...prev, [name]: message }));
  const removeError = (name: string) =>
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  // Is submittable (is not disabeled)
  const [isSubmittable, setIsSubmittable] = useState(false);
  const disableSubmit = () => setIsSubmittable(false);
  const enableSubmit = () => setIsSubmittable(true);
  useEffect(() => {
    if (Object.keys(formErrors).length == 0) {
      enableSubmit();
    } else {
      disableSubmit();
    }
  }, [formErrors]);
  return (
    <FormContext.Provider
      value={{
        formErrors,
        addError,
        removeError,
        isSubmittable,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook for cleaner usage
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
