"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

export default function Sidebar({ isOpen: propIsOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Aseguramos que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setIsOpen(propIsOpen)
    setMounted(true)
  }, [propIsOpen])

  // Escuchar eventos personalizados para abrir/cerrar la sidebar
  useEffect(() => {
    if (!mounted) return

    const handleToggleSidebar = () => {
      setIsOpen((prev) => !prev)
      // Notificar al componente padre si es necesario
      if (onClose) {
        onClose()
      }
      // Disparar un evento para notificar que la sidebar ha cambiado
      window.dispatchEvent(new CustomEvent("sidebar-toggled"))
    }

    window.addEventListener("toggle-sidebar", handleToggleSidebar)
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar)
    }
  }, [onClose, mounted])

  // Cerrar sidebar al cambiar de tamaño de pantalla
  useEffect(() => {
    if (!mounted) return

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
        if (onClose) {
          onClose()
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [onClose, mounted])

  // Función para determinar si un enlace está activo
  const isLinkActive = (path) => {
    if (path === "/users/events" && pathname.startsWith("/users/events")) {
      return true
    }
    return pathname === path
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div
        className="absolute inset-y-0 left-0 z-10 w-64 transform -translate-x-full transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "rgba(45, 52, 67, 0.95)",
          borderRight: "1px solid rgba(70, 78, 94, 0.7)",
        }}
      ></div>
    )
  }

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
          onClick={() => {
            setIsOpen(false)
            if (onClose) {
              onClose()
            }
          }}
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
              className={`block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors ${
                isLinkActive("/users/events")
                  ? "bg-opacity-30 text-white border-l-[3px] border-l-[#BF8D6B]"
                  : "hover:bg-opacity-20 border-l-[3px] border-l-transparent"
              }`}
              style={{
                backgroundColor: isLinkActive("/users/events") ? "rgba(70, 78, 94, 0.3)" : "rgba(70, 78, 94, 0.0)",
              }}
            >
              Área Eventos
            </Link>
          </li>
          <li>
            <Link
              href="/users/profile"
              className={`block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors ${
                isLinkActive("/users/profile")
                  ? "bg-opacity-30 text-white border-l-[3px] border-l-[#BF8D6B]"
                  : "hover:bg-opacity-20 border-l-[3px] border-l-transparent"
              }`}
              style={{
                backgroundColor: isLinkActive("/users/profile") ? "rgba(70, 78, 94, 0.3)" : "rgba(70, 78, 94, 0.0)",
              }}
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/users/settings"
              className={`block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors ${
                isLinkActive("/users/settings")
                  ? "bg-opacity-30 text-white border-l-[3px] border-l-[#BF8D6B]"
                  : "hover:bg-opacity-20 border-l-[3px] border-l-transparent"
              }`}
              style={{
                backgroundColor: isLinkActive("/users/settings") ? "rgba(70, 78, 94, 0.3)" : "rgba(70, 78, 94, 0.0)",
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



