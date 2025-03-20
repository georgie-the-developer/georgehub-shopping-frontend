"use client";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
export default function Page() {
  const { logout } = useUser();
  logout();
  setTimeout(() => {
    redirect("/welcome");
  }, 1000);
  return <div className="">Logging out...</div>;
}
