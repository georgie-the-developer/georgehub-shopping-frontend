"use client";
import "@/styles/globals/index.scss";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/contexts/ThemeContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const { darkTheme } = useTheme();
  return (
    <div className={`body ${darkTheme ? "theme-dark" : ""}`}>
      <Header openSidebar={openSidebar} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="main">{children}</div>
    </div>
  );
}
