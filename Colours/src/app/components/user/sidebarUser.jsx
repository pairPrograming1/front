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
      className={`absolute inset-y-0 left-0 z-10 w-64 transform border-r border-xevent-medium bg-xevent-dark transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between border-b border-xevent-medium px-4">
        <h2 className="text-xl font-semibold text-xevent-light">Menú</h2>
        <button
          onClick={onClose}
          className="rounded-md p-2 text-xevent-light hover:bg-xevent-medium md:hidden"
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
              className="block rounded-md px-4 py-2 text-xevent-lightgray hover:bg-xevent-medium hover:text-xevent-light"
            >
              Área Eventos
            </Link>
          </li>
          <li>
            <Link
              href="/users/profile"
              className="block rounded-md px-4 py-2 text-xevent-lightgray hover:bg-xevent-medium hover:text-xevent-light"
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/users/settings"
              className="block rounded-md px-4 py-2 text-xevent-lightgray hover:bg-xevent-medium hover:text-xevent-light"
            >
              Configuración
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

