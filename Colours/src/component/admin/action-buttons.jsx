"use client"

import { UserPlus } from "lucide-react"

export default function ActionButtons({ onAddUser }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 md:mt-0 w-full md:w-auto">
      <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md text-sm">Crear Roles</button>
      <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md text-sm">Asignar Roles</button>
      <button
        onClick={onAddUser}
        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
      >
        <UserPlus size={16} />
        <span>Agregar</span>
      </button>
    </div>
  )
}

