"use client";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
export default function Page() {
  const { logout } = useUser();
  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      redirect("/welcome");
    }, 1000);
    return () => clearTimeout(timer);
  }, [logout]);
  return <div className="">Logging out...</div>;
}
