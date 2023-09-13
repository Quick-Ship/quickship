import { DashboardNabvar, DashboardSidebar } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <DashboardNabvar />
        <DashboardSidebar>
          <main>{children}</main>
        </DashboardSidebar>
      </body>
    </html>
  );
}
