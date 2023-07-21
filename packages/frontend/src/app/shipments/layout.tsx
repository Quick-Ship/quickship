import { Providers } from "@/common";

export default function ShipmentsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <Providers>
        <main >{children}</main>
      </Providers>
    );
  }
  