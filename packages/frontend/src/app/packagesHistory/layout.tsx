"use client";

import { Providers } from "@/common";

export default function PackagesHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main>{children}</main>
    </Providers>
  );
}
