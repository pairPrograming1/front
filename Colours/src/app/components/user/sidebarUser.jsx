"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export default function Sidebar({ isOpen, onClose }) {
  // Cerrar sidebar al cambiar de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [onClose])

  return (
    <div
      className={`absolute inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
      style={{
        backgroundColor: "rgba(45, 52, 67, 0.95)",
        borderRight: "1px solid rgba(70, 78, 94, 0.7)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="flex h-16 items-center justify-between px-4"
        style={{ borderBottom: "1px solid rgba(70, 78, 94, 0.7)" }}
      >
        <h2 className="text-xl font-semibold text-white">Menú</h2>
        <button
          onClick={onClose}
          className="rounded-md p-2 text-white hover:bg-opacity-50 md:hidden"
          style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="mt-4 px-2">
        <ul className="space-y-2">
          <li>
            <Link
              href="/users/events"
              className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors"
              style={{
                backgroundColor: "rgba(70, 78, 94, 0.3)",
                borderLeft: "3px solid #BF8D6B",
              }}
            >
              Área Eventos
            </Link>
          </li>
          <li>
            <Link
              href="/users/profile"
              className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-opacity-20"
              style={{
                backgroundColor: "rgba(70, 78, 94, 0.0)",
                borderLeft: "3px solid transparent",
              }}
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/users/settings"
              className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-opacity-20"
              style={{
                backgroundColor: "rgba(70, 78, 94, 0.0)",
                borderLeft: "3px solid transparent",
              }}
            >
              Configuración
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}


