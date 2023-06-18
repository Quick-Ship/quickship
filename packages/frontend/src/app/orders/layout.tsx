import { Providers } from "@/common";

export default function OrdersLayout({
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
  