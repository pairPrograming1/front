"use client"

import { UserPlus } from "lucide-react"

export default function ActionButtons({ onAddUser }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0 w-full md:w-auto">
      <button className="bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white px-3 py-2 rounded-md text-sm">Crear Roles</button>
      <button className="bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white px-3 py-2 rounded-md text-sm">Asignar Roles</button>
      <button
        onClick={onAddUser}
        className="bg-[#00e5b0] hover:bg-[#00c59a] text-[#0a1929] font-medium px-3 py-2 rounded-md text-sm flex items-center gap-2"
      >
        <UserPlus size={16} />
        <span>Agregar</span>
      </button>
    </div>
  )
}


