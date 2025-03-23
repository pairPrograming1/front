"use client"

import { useState } from "react"
import { Users, Store, Building2, Calendar, DollarSign, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Sidebar({ activePage }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Determinar la página activa basada en la ruta o el prop
  const isActive = (path) => {
    if (activePage) {
      return activePage === path
    }

    if (path === "usuarios") {
      return pathname === "/admin" || pathname === "/"
    } else if (path === "puntos-venta") {
      return pathname === "/admin/sellpoint" || pathname.startsWith("/admin/sellpoint/")
    } else {
      return pathname === `/admin/${path}` || pathname.startsWith(`/admin/${path}/`)
    }
  }

  return (
    <aside className={`bg-[#0f2744] transition-all duration-300 flex flex-col h-full ${collapsed ? "w-16" : "w-64"}`}>
      <div
        className={`p-4 border-b border-[#1a3a5f] flex ${collapsed ? "justify-center" : "justify-between"} items-center`}
      >
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-[#00e5b0] font-semibold text-xl">COLOUR</span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center">
            <span className="text-[#00e5b0] font-semibold text-xl">C</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#1a3a5f]">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className={`p-2 flex-1 overflow-y-auto`}>
        <ul className="space-y-2 mt-2">
          <li>
            <Link
              href="/admin"
              className={`flex items-center gap-3 p-2 rounded-md ${isActive("usuarios") ? "text-[#00e5b0]" : "text-gray-300"} hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
            >
              <Users size={20} />
              {!collapsed && <span>Usuarios</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/sellpoint"
              className={`flex items-center gap-3 p-2 rounded-md ${isActive("puntos-venta") ? "text-[#00e5b0]" : "text-gray-300"} hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
            >
              <Store size={20} />
              {!collapsed && <span>Puntos de Venta</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/salones"
              className={`flex items-center gap-3 p-2 rounded-md ${isActive("salones") ? "text-[#00e5b0]" : "text-gray-300"} hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
            >
              <Building2 size={20} />
              {!collapsed && <span>Salones</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/eventos"
              className={`flex items-center gap-3 p-2 rounded-md ${isActive("eventos") ? "text-[#00e5b0]" : "text-gray-300"} hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
            >
              <Calendar size={20} />
              {!collapsed && <span>Eventos</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/cobros-pagos"
              className={`flex items-center gap-3 p-2 rounded-md ${isActive("cobros-pagos") ? "text-[#00e5b0]" : "text-gray-300"} hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
            >
              <DollarSign size={20} />
              {!collapsed && <span>Cobros y Pagos</span>}
            </Link>
          </li>
        </ul>

        <div className="mt-8 pt-4 border-t border-[#1a3a5f]">
          <h3 className={`text-xs uppercase text-gray-500 font-medium mb-2 px-2 ${collapsed ? "hidden" : ""}`}>
            Contenido Menu
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  toggleSidebar()
                }}
                className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#1a3a5f] ${collapsed ? "justify-center" : ""}`}
              >
                <Menu size={20} />
                {!collapsed && <span>Contraer Menu</span>}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}





