"use client"

import { X, Search } from "lucide-react"

export default function VendedorModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agregar Vendedor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <input type="text" placeholder="Buscar Vendedor" className="search-input pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <button className="btn btn-primary w-full mt-4">Asignar</button>
      </div>
    </div>
  )
}
