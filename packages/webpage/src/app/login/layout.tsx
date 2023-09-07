"use client";

import { AuthProvider, ClientProvider } from "@/hooks";

export default function LoginRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <AuthProvider>
        <html lang="en">
          <body className="max-sm:bg-slate-100" suppressHydrationWarning={true}>
            {children}
          </body>
        </html>
      </AuthProvider>
    </ClientProvider>
  );
}
