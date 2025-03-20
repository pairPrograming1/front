"use client"

import { useEffect, useRef } from "react"
import { X } from 'lucide-react'

export default function UserModal({ onClose }) {
  const modalRef = useRef(null)
  
  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])
  
  // Cerrar modal al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-slate-800 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-lg font-medium text-white">Agregar Usuario</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Rol"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-700">
          <button 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}

