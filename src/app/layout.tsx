"use client";
import "@/styles/globals/index.scss";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Layout from "./(grouped)/layout";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <Layout>{children}</Layout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
