"use client";

import { ClientProvider } from "@/hooks";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className="relative">
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
