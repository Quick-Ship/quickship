"use client";

import { Providers } from "@/common";

export default function WarehousesClientsLayout({
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
