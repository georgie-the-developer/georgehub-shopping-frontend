import "@/styles/globals/index.scss"
import Header from "@/components/Header"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <div className="main">
        {children}
        </div>
      </body>
    </html>
  )
}