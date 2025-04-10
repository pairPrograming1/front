import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Colour Admin",
  description: "Panel de administración para Colour",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <div className="flex h-screen">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
