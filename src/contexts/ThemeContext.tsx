"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
    return false;
  });
  useEffect(() => {
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);
  const toggleTheme = () => setDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
