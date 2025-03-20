"use client"

import React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"

// Datos de ejemplo
const users = [
  {
    id: 1,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador, Vendedor",
    department: "Ventas",
    lastLogin: "Hace 2 horas",
  },
  {
    id: 2,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Creador",
    department: "Marketing",
    lastLogin: "Hace 1 día",
  },
  {
    id: 3,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "IT",
    lastLogin: "Hace 3 días",
  },
  {
    id: 4,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "Finanzas",
    lastLogin: "Hace 5 horas",
  },
  {
    id: 5,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "RRHH",
    lastLogin: "Hace 1 semana",
  },
  {
    id: 6,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "Soporte",
    lastLogin: "Hace 2 días",
  },
  {
    id: 7,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "Desarrollo",
    lastLogin: "Hace 4 horas",
  },
  {
    id: 8,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "Ventas",
    lastLogin: "Hace 1 hora",
  },
  {
    id: 9,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "Marketing",
    lastLogin: "Hace 3 horas",
  },
  {
    id: 10,
    username: "Roggio",
    name: "Mariano Roggio",
    email: "roggio@example.ar",
    role: "Administrador",
    department: "IT",
    lastLogin: "Hace 6 días",
  },
]

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState([])

  const toggleRowExpand = (userId) => {
    setExpandedRows((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const isRowExpanded = (userId) => expandedRows.includes(userId)

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-4 sm:-mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th scope="col" className="w-12 p-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded focus:ring-teal-600" />
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Usuario
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                  >
                    Nombre y Apellido
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                  >
                    Tipo de Usuario
                  </th>
                  <th
                    scope="col"
                    className="sm:hidden px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase"
                  >
                    Datos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className={`hover:bg-slate-700 ${isRowExpanded(user.id) ? "bg-slate-700" : ""}`}>
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded focus:ring-teal-600" />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{user.username}</td>
                      <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                      <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {user.role}
                      </td>
                      <td className="sm:hidden px-4 py-3 text-center">
                        <button
                          onClick={() => toggleRowExpand(user.id)}
                          className="p-1.5 rounded-full hover:bg-slate-600 text-gray-300"
                        >
                          {isRowExpanded(user.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>
                    {isRowExpanded(user.id) && (
                      <tr className="sm:hidden bg-slate-800">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="grid grid-cols-1 gap-2 text-sm text-gray-300 pb-2">
                            <div>
                              <span className="font-medium text-gray-400">Nombre y Apellido:</span> {user.name}
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Tipo de Usuario:</span> {user.role}
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Departamento:</span> {user.department}
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Último acceso:</span> {user.lastLogin}
                            </div>
                            <div className="flex justify-end mt-2">
                              <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-xs">
                                Editar
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <nav className="flex items-center space-x-1">
          <button className="px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="px-3 py-1 rounded-md bg-teal-600 text-white">1</button>
          <button className="px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">2</button>
          <button className="px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">3</button>
          <button className="hidden sm:block px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">
            4
          </button>
          <button className="hidden sm:block px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">
            5
          </button>
          <span className="hidden sm:block px-3 py-1 text-gray-300">...</span>
          <button className="hidden sm:block px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">
            30
          </button>
          <button className="px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700">
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  )
}

