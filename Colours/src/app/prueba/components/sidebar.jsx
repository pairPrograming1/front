"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LucideHome,
  Store,
  Building2,
  CalendarDays,
  CreditCard,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-[60px]" : "w-[120px]"
      } bg-[#1E2330] text-white border-r border-[#2A2F3D] flex flex-col transition-all duration-300`}
    >
      <div className="p-4 border-b border-[#2A2F3D]">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {isCollapsed ? "C" : "C"}
            <span className="text-[#C88D6B]">{isCollapsed ? "" : "O"}</span>
            {isCollapsed ? "" : "LOUR"}
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/prueba/usuarios"
              className="flex flex-col items-center p-3 text-gray-400 hover:text-[#C88D6B]"
            >
              <LucideHome className="h-5 w-5 mb-1" />
              {!isCollapsed && <span className="text-xs">Usuario</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/prueba/puntos-de-venta"
              className="flex flex-col items-center p-3 text-gray-400 hover:text-[#C88D6B]"
            >
              <Store className="h-5 w-5 mb-1" />
              {!isCollapsed && <span className="text-xs">Puntos de Venta</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/prueba/salones"
              className="flex flex-col items-center p-3 text-gray-400 hover:text-[#C88D6B]"
            >
              <Building2 className="h-5 w-5 mb-1" />
              {!isCollapsed && <span className="text-xs">Salones</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/prueba/eventos"
              className="flex flex-col items-center p-3 text-gray-400 hover:text-[#C88D6B]"
            >
              <CalendarDays className="h-5 w-5 mb-1" />
              {!isCollapsed && <span className="text-xs">Eventos</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/prueba/cobros-y-pagos"
              className="flex flex-col items-center p-3 text-gray-400 hover:text-[#C88D6B]"
            >
              <CreditCard className="h-5 w-5 mb-1" />
              {!isCollapsed && <span className="text-xs">Cobros y Pagos</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-[#2A2F3D]">
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center w-full text-gray-400 hover:text-[#C88D6B]"
        >
          <Menu className="h-5 w-5 mb-1" />
          {!isCollapsed && <span className="text-xs">Contraer Menu</span>}
        </button>
      </div>
    </div>
  );
}
