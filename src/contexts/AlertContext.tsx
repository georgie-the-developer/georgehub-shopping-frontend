"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AlertContextType = {
  alert: string | null;
  showAlert: (message: string) => void;
  closeAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 10000);
  };

  const closeAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
