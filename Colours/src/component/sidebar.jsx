"use client"

import { useState } from 'react'
import { Users, Shield, DollarSign, Calendar, FileText, Menu, ChevronLeft, ChevronRight, Settings, User } from 'lucide-react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  
  return (
    <aside className={`bg-slate-800 transition-all duration-300 flex flex-col h-screen ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className={`p-4 border-b border-slate-700 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-teal-500 font-semibold text-xl">COLOUR</span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center">
            <span className="text-teal-500 font-semibold text-xl">C</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-slate-700"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className={`p-2 flex-1`}>
        <ul className="space-y-2">
          <li>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-teal-400 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
              <Users size={20} />
              {!collapsed && <span>Usuarios</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
              <Shield size={20} />
              {!collapsed && <span>Restricciones</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
              <DollarSign size={20} />
              {!collapsed && <span>Salarios</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
              <Calendar size={20} />
              {!collapsed && <span>Eventos</span>}
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
              <FileText size={20} />
              {!collapsed && <span>Cuentas y Pagos</span>}
            </a>
          </li>
        </ul>
        
        {!collapsed && (
          <div className="mt-8 pt-4 border-t border-slate-700">
            <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 px-2">Contenido Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700">
                  <Menu size={20} />
                  <span>Opciones</span>
                </a>
              </li>
            </ul>
          </div>
        )}
        
        {collapsed && (
          <div className="mt-8 pt-4 border-t border-slate-700">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-slate-700">
                  <Menu size={20} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
      
      <div className="mt-auto p-2 border-t border-slate-700">
        <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
          <Settings size={20} />
          {!collapsed && <span>Configuración</span>}
        </a>
        <a href="#" className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-slate-700 ${collapsed ? 'justify-center' : ''}`}>
          <User size={20} />
          {!collapsed && <span>Mi Perfil</span>}
        </a>
      </div>
    </aside>
  )
}


