"use client";
import "@/styles/globals/index.scss";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { useSidebar } from "@/contexts/SidebarContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkTheme } = useTheme();
  const { sidebarIsOpen, openSidebar, closeSidebar } = useSidebar();
  return (
    <div className={`body ${darkTheme ? "theme-dark" : ""}`}>
      <Header openSidebar={openSidebar} />
      <Sidebar isOpen={sidebarIsOpen} closeSidebar={closeSidebar} />
      <div className="main">{children}</div>
    </div>
  );
}
