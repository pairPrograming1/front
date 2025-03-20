"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div ref={modalRef} className="bg-[#0f2744] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-[#1a3a5f]">
          <h2 className="text-xl font-medium text-white">Agregar Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#1a3a5f]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              placeholder="Ingrese nombre de usuario"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5b0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Ingrese nombre"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5b0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Apellido</label>
            <input
              type="text"
              placeholder="Ingrese apellido"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5b0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="Ingrese correo electrónico"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5b0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Rol</label>
            <input
              type="text"
              placeholder="Seleccione rol"
              className="w-full bg-[#0a1929] border border-[#1a3a5f] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5b0] focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-5 border-t border-[#1a3a5f]">
          <button className="w-full bg-[#00e5b0] hover:bg-[#00c59a] text-[#0a1929] font-medium py-3 px-4 rounded-lg text-sm transition-colors">
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}


