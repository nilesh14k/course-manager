import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-beige min-h-screen flex flex-col">
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          <main className="flex-grow pt-[70px] md:pt-[80px]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
