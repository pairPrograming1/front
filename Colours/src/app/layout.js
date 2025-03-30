"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true); // Indica que el componente ya está montado.

    if (typeof window !== "undefined") {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Auth0Provider
          domain="pabloelleproso.us.auth0.com" // Usar el dominio proporcionado
          clientId="LQZvjXTatV5t7VzdekZ7sSYZYdoAyndN" // Usar el clientId proporcionado
          redirectUri={
            typeof window !== "undefined" ? window.location.origin : ""
          }
        >
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative`}
            style={{
              background: isMounted
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 119, 97, 0.85), transparent 80%), rgb(5, 34, 62)`
                : "rgb(5, 34, 62)",
            }}
          >
            {children}
          </div>
        </Auth0Provider>
      </body>
    </html>
  );
}
