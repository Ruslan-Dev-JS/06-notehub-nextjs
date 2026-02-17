import "./globals.css";
import Header from "@/src/app/components/Header/Header";
import Footer from "@/src/app/components/Footer/Footer";
import TanStackProvider from "@/src/app/components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}