export default function CreateShipementLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <nav>About NavBar</nav>
        <main >{children}</main>
      </>
    );
  }
  