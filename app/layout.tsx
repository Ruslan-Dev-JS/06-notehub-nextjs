import "./globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import TanStackProvider from "@/app/components/TanStackProvider/TanStackProvider";

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