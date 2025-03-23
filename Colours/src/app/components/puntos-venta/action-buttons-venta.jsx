"use client"

import { Plus, MapPin } from "lucide-react"

export default function ActionButtons({ onAddPuntoVenta }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0 w-full md:w-auto">
      <button className="bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white px-3 py-2 rounded-md text-sm flex items-center gap-2">
        <MapPin size={16} />
        <span>Ver Mapa</span>
      </button>
      <button
        onClick={onAddPuntoVenta}
        className="bg-[#00e5b0] hover:bg-[#00c59a] text-[#0a1929] font-medium px-3 py-2 rounded-md text-sm flex items-center gap-2"
      >
        <Plus size={16} />
        <span>Agregar Punto</span>
      </button>
    </div>
  )
}

