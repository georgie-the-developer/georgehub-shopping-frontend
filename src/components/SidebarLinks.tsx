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
          <NavLink title="Login" route="/login" />
          <NavLink title="Register" route="/register" />
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
          <NavLink title="Logout" route="/logout" />
        </>
      )}
      {userRole == "seller" && (
        <>
          <NavLink title="Dashboard" route="/seller/dashboard" />
          <NavLink title="Profile" route="/profile" />
          <NavLink title="Notifications" route="/notifications" />
          <NavLink title="Logout" route="/logout" />
        </>
      )}
      {userRole == "admin" && (
        <>
          <NavLink title="Dashboard" route="/admin/dashboard" />
          <NavLink title="Profile" route="/profile" />
          <NavLink title="Home" route="/home" />
          <NavLink title="Blacklist" route="/blacklist" />
          <NavLink title="Notifications" route="/notifications" />
          <NavLink title="Logout" route="/logout" />
        </>
      )}
    </>
  );
}
