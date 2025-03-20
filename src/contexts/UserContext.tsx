"use client";
import config from "config.json";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAlert } from "./AlertContext";

interface User {
  username?: string;
  email?: string;
  role: "guest" | "buyer" | "seller" | "admin" | "guest";
  full_name?: string;
  card_number?: string;
  address?: string;
  support_email?: string;
}

interface UserContextType {
  user: User;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ role: "guest" });
  const { showAlert } = useAlert();
  const fetchUser = async () => {
    let url = config.API_URL + "auth/me";
    let res = await fetch(url, { credentials: "include" });
    if (!res.ok) return { role: "guest" };
    let data = await res.json();
    console.log(data);
    return data.user;
  };
  const logout = async () => {
    let url = config.API_URL + "auth/logout";
    let csrfUrl = config.API_URL + "auth/csrf-token";
    let csrfSetRes = await fetch(csrfUrl, {
      credentials: "include",
    }); // set csrf
    let csrfToken = (await csrfSetRes.json()).csrf_token;
    let res = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    if (res.ok) {
      setUser({ role: "guest" });
    } else {
      showAlert("Something went wrong");
    }
  };
  useEffect(() => {
    const preserveUser = async () => {
      let userData = await fetchUser();
      setUser(userData);
    };
    preserveUser();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
