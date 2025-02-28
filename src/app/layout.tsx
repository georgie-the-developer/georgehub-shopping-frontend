import "@/styles/globals/index.scss";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
