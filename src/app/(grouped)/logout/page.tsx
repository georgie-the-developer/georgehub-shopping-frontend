"use client";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
export default function Page() {
  const { logout } = useUser();
  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      redirect("/welcome");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return <Loading />;
}
