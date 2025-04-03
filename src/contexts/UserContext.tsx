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
import { getCookie, setCsrf } from "@/helpers/cookies";
import Loading from "@/components/Loading";
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
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const fetchUser = async () => {
    let url = config.API_URL + "auth/me";
    let res = await fetch(url, { credentials: "include" });
    if (!res.ok) return { role: "guest" };
    let data = await res.json();
    return data.user;
  };
  const login = async () => {
    let userData = await fetchUser();
    setUser(userData);
  };
  const logout = async () => {
    let url = config.API_URL + "auth/logout";
    let csrfToken = getCookie("csrf_token");
    let res = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    setUser({ role: "guest" });
  };
  useEffect(() => {
    const preserveUser = async () => {
      let userData = await fetchUser();
      setUser(userData);
    };
    preserveUser();
    setCsrf();
    setInterval(() => {
      setCsrf();
    }, 60000);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (user == null) {
    return <Loading />;
  }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
