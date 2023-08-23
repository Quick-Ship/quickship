import { Nabvar, Footer } from "@/components";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = "";
  return (
    <html lang="en">
      <body className="relative">

        {children}
      </body>
    </html>
  );
}
