"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/user/sidebarUser";
import { LogoutButton } from "../components/logout/LogoutButton";

export default function UsersLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escuchar eventos de toggle-sidebar
  useEffect(() => {
    if (!mounted) return;

    const handleToggleSidebar = () => {
      setSidebarOpen((prev) => !prev);
    };

    window.addEventListener("toggle-sidebar", handleToggleSidebar);
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, [mounted]);

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div
        className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        style={{
          height: "calc(100vh - 40px)",
          backgroundColor: "rgba(45, 52, 67, 0.7)",
        }}
      >
        <div
          className="h-16"
          style={{ borderBottom: "1px solid rgba(70, 78, 94, 0.7)" }}
        ></div>
        <div className="flex-1"></div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl"
      style={{ height: "calc(100vh - 40px)" }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          backgroundColor: "rgba(45, 52, 67, 0.7)",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Navbar */}
        <header
          className="flex h-16 items-center justify-between px-4 md:px-6"
          style={{ borderBottom: "1px solid rgba(70, 78, 94, 0.7)" }}
        >
          <div className="flex items-center">
            {/* Botón de menú siempre a la izquierda */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 rounded-md p-2 text-white hover:bg-opacity-50"
              style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/users" className="text-2xl font-bold text-white">
              XEVENT
            </Link>
          </div>

          <div className="flex items-center">
            {/* Botón de regresar a la derecha, solo visible en páginas que no son /users */}
            {pathname !== "/users" && (
              <Link
                href="/users"
                className="rounded-md p-2 text-white hover:bg-opacity-50"
                style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
                aria-label="Volver"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
            )}
            {/* Botón de logout */}
            <LogoutButton className="ml-4" />
          </div>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          {/* Sidebar Component */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
