"use client";
import "@/styles/globals/index.scss";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AlertProvider } from "@/contexts/AlertContext";
import ChildLayout from "./(grouped)/childLayout";
import UserProvider from "@/contexts/UserContext";
import { Suspense } from "react";
import Loading from "@/components/Loading";
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
                <ChildLayout>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </ChildLayout>
              </UserProvider>
            </SidebarProvider>
          </AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
