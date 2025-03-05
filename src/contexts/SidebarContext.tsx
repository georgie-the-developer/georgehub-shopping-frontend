"use client"; // Needed in Next.js App Router for stateful components
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  sidebarIsOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarIsOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{ sidebarIsOpen, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for cleaner usage
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
