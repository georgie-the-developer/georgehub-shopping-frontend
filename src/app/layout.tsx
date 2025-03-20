"use client";
import "@/styles/globals/index.scss";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AlertProvider } from "@/contexts/AlertContext";
import Layout from "./(grouped)/layout";
import UserProvider from "@/contexts/UserContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AlertProvider>
            <SidebarProvider>
              <UserProvider>
                <Layout>{children}</Layout>
              </UserProvider>
            </SidebarProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
