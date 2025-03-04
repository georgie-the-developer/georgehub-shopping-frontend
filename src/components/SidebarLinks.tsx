"use client";
import React from "react";
import sidebar from "@/styles/modules/sidebar.module.scss";
import NavLink from "./NavLink";
type SidebarLinkProps = {
  userRole: string;
};
export default function SidebarLinks({ userRole }: SidebarLinkProps) {
  return (
    <>
      {userRole == "guest" && (
        <>
          <NavLink title="Welcome" route="/welcome" />
          <NavLink title="Login" route="/auth/login" />
          <NavLink title="Register" route="/auth/register" />
          <NavLink title="Home" route="/home" />
        </>
      )}
      {userRole == "buyer" && (
        <>
          <NavLink title="Home" route="/welcome" />
          <NavLink title="Profile" route="/profile" />
          <NavLink title="Shopping cart" route="/cart" />
          <NavLink title="Upgrade to seller" route="/upgrade_to_seller" />
          <NavLink title="Notifications" route="/notifications" />
          <NavLink title="Logout" route="/auth/logout" />
        </>
      )}
      {userRole == "seller" && (
        <>
          <NavLink title="Dashboard" route="/seller/dashboard" />
          <NavLink title="Profile" route="/profile" />
          <NavLink title="Notifications" route="/notifications" />
          <NavLink title="Logout" route="/auth/logout" />
        </>
      )}
      {userRole == "admin" && (
        <>
          <NavLink title="Dashboard" route="/admin/dashboard" />
          <NavLink title="Profile" route="/profile" />
          <NavLink title="Home" route="/home" />
          <NavLink title="Blacklist" route="/blacklist" />
          <NavLink title="Notifications" route="/notifications" />
          <NavLink title="Logout" route="/auth/logout" />
        </>
      )}

      {/* This code structure is good, because:
          - it has only one responsibility - display links based on userRole
          string value (Single responsibility principle);
          - it is easily extendable, while not modifiable (Open-closed principle);
          - it is readable
           */}
    </>
  );
}
