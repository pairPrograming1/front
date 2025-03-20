"use client"

import { useState } from "react"
import { Users, Store, Building2, Calendar, DollarSign, Menu } from "lucide-react"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside className={`bg-[#1e3a5f] transition-all duration-300 flex flex-col h-full ${collapsed ? "w-16" : "w-64"}`}>
      <div
        className={`p-4 border-b border-[#2c4a6f] flex ${collapsed ? "justify-center" : "justify-between"} items-center`}
      >
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-teal-400 font-semibold text-xl">COLOUR</span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center">
            <span className="text-teal-400 font-semibold text-xl">C</span>
          </div>
        )}
      </div>

      <nav className={`p-2 flex-1 overflow-y-auto`}>
        <ul className="space-y-2 mt-2">
          <li>
            <a
              href="#"
              className={`flex items-center gap-3 p-2 rounded-md text-teal-400 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
            >
              <Users size={20} />
              {!collapsed && <span>Usuarios</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
            >
              <Store size={20} />
              {!collapsed && <span>Puntos de Venta</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
            >
              <Building2 size={20} />
              {!collapsed && <span>Salones</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
            >
              <Calendar size={20} />
              {!collapsed && <span>Eventos</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
            >
              <DollarSign size={20} />
              {!collapsed && <span>Cobros y Pagos</span>}
            </a>
          </li>
        </ul>

        <div className="mt-8 pt-4 border-t border-[#2c4a6f]">
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
                className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#2c4a6f] ${collapsed ? "justify-center" : ""}`}
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




