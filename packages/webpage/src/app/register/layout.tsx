import "../globals.css";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-sm:bg-slate-100" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
