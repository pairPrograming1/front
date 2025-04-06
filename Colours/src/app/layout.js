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
      const handleMouseMove    = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <Auth0Provider
      domain="pabloelleproso.us.auth0.com"
      clientId="WQbuELjdIzyXdVLQC7LJ8g1qkPzjSyuN"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
        audience: "https://pabloelleproso.us.auth0.com/api/v2/", // Cambia esto si usas una API personalizada
      }}
    >
      <html lang="en">
        <body>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen flex flex-col items-center justify-center relative`}
            style={{
              background: isMounted
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(194, 139, 96, 0.85), transparent 80%), #1E2330`
                : "#1E2330",
              color: "#FFFFFF",
            }}
          >
            <style jsx global>{`
              body {
                background-color: #1e2330;
                color: #ffffff;
              }
              .secondary-text {
                color: #a0a0a0;
              }
              button {
                background-color: #c28b60;
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
              }
              button:hover {
                opacity: 0.9;
              }
              input {
                background-color: #2a2f3d;
                color: #ffffff;
                border: 1px solid #a0a0a0;
                padding: 10px;
                border-radius: 5px;
              }
              input::placeholder {
                color: #a0a0a0;
              }
            `}</style>
            {children}
          </div>
        </body>
      </html>
    </Auth0Provider>
  );
}
