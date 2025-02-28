"use client";
import "@/styles/globals/index.scss";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <html lang="en">
      <body>
        <Header openSidebar={openSidebar} />
        {sidebarOpen && <Sidebar closeSidebar={closeSidebar}/>}
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
