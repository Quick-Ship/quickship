"use client";

import { Providers } from "@/common";
import { ToastsProvider } from "@/hooks";
import { EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";

export default function GeneratePackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EuiProvider colorMode="light">
      <Providers>
        <ToastsProvider>
          <main>{children}</main>
        </ToastsProvider>
      </Providers>
    </EuiProvider>
  );
}
