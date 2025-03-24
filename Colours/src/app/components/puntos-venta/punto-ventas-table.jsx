"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, MapPin, Phone } from "lucide-react"
import React from "react"

// Datos de ejemplo para puntos de venta
const puntosVenta = [
  {
    id: 1,
    nombre: "Sucursal Centro",
    direccion: "Av. Corrientes 1234, CABA",
    telefono: "+54 11 4567-8901",
    encargado: "Juan Pérez",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    direccion: "Av. Cabildo 2345, CABA",
    telefono: "+54 11 4567-8902",
    encargado: "María López",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
  {
    id: 3,
    nombre: "Sucursal Sur",
    direccion: "Av. Rivadavia 3456, CABA",
    telefono: "+54 11 4567-8903",
    encargado: "Carlos Rodríguez",
    estado: "Inactivo",
    horario: "Lun-Vie: 9:00-18:00",
  },
  {
    id: 4,
    nombre: "Sucursal Oeste",
    direccion: "Av. Rivadavia 4567, CABA",
    telefono: "+54 11 4567-8904",
    encargado: "Ana Martínez",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
  {
    id: 5,
    nombre: "Sucursal Este",
    direccion: "Av. Callao 5678, CABA",
    telefono: "+54 11 4567-8905",
    encargado: "Roberto Fernández",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
  {
    id: 6,
    nombre: "Sucursal Palermo",
    direccion: "Av. Santa Fe 6789, CABA",
    telefono: "+54 11 4567-8906",
    encargado: "Laura González",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
  {
    id: 7,
    nombre: "Sucursal Belgrano",
    direccion: "Av. Cabildo 7890, CABA",
    telefono: "+54 11 4567-8907",
    encargado: "Diego Sánchez",
    estado: "Inactivo",
    horario: "Lun-Vie: 9:00-18:00",
  },
  {
    id: 8,
    nombre: "Sucursal Recoleta",
    direccion: "Av. Santa Fe 8901, CABA",
    telefono: "+54 11 4567-8908",
    encargado: "Sofía Pérez",
    estado: "Activo",
    horario: "Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00",
  },
]

export default function PuntosVentaTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState([])
  const [selectedPuntos, setSelectedPuntos] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const toggleRowExpand = (puntoId) => {
    setExpandedRows((prev) => (prev.includes(puntoId) ? prev.filter((id) => id !== puntoId) : [...prev, puntoId]))
  }

  const isRowExpanded = (puntoId) => expandedRows.includes(puntoId)

  // Manejar selección de todos los puntos
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPuntos([])
    } else {
      setSelectedPuntos(puntosVenta.map((punto) => punto.id))
    }
    setSelectAll(!selectAll)
  }

  // Manejar selección individual
  const handleSelectPunto = (puntoId) => {
    setSelectedPuntos((prev) => {
      if (prev.includes(puntoId)) {
        const newSelected = prev.filter((id) => id !== puntoId)
        if (newSelected.length !== puntosVenta.length) {
          setSelectAll(false)
        }
        return newSelected
      } else {
        const newSelected = [...prev, puntoId]
        if (newSelected.length === puntosVenta.length) {
          setSelectAll(true)
        }
        return newSelected
      }
    })
  }

  // Verificar si un punto está seleccionado
  const isSelected = (puntoId) => selectedPuntos.includes(puntoId)

  // Renderizar el estado con color
  const renderEstado = (estado) => {
    if (estado === "Activo") {
      return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Activo</span>
    } else {
      return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">Inactivo</span>
    }
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto -mx-4 sm:-mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full">
              <thead className="bg-[#0f2744]">
                <tr>
                  <th scope="col" className="w-12 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#00e5b0] rounded focus:ring-[#00e5b0]"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                  >
                    Dirección
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                  >
                    Teléfono
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                  >
                    Encargado
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="sm:hidden px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase"
                  >
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3a5f]">
                {puntosVenta.map((punto) => (
                  <React.Fragment key={punto.id}>
                    <tr className={`hover:bg-[#1a3a5f] ${isRowExpanded(punto.id) ? "bg-[#1a3a5f]" : "bg-[#0f2744]"}`}>
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-[#00e5b0] rounded focus:ring-[#00e5b0]"
                            checked={isSelected(punto.id)}
                            onChange={() => handleSelectPunto(punto.id)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{punto.nombre}</td>
                      <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-300">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          {punto.direccion}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          {punto.telefono}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-300">{punto.encargado}</td>
                      <td className="hidden sm:table-cell px-4 py-3 text-center">{renderEstado(punto.estado)}</td>
                      <td className="sm:hidden px-4 py-3 text-center">
                        <button
                          onClick={() => toggleRowExpand(punto.id)}
                          className="p-1.5 rounded-full hover:bg-[#2a4a6f] text-gray-300"
                        >
                          {isRowExpanded(punto.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>
                    {isRowExpanded(punto.id) && (
                      <tr className="sm:hidden bg-[#0a1929]">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="grid grid-cols-1 gap-2 text-sm text-gray-300 pb-2">
                            <div>
                              <span className="font-medium text-gray-400">Dirección:</span>
                              <div className="flex items-center mt-1">
                                <MapPin size={16} className="mr-2 text-gray-400" />
                                {punto.direccion}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Teléfono:</span>
                              <div className="flex items-center mt-1">
                                <Phone size={16} className="mr-2 text-gray-400" />
                                {punto.telefono}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Encargado:</span> {punto.encargado}
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Estado:</span> {renderEstado(punto.estado)}
                            </div>
                            <div>
                              <span className="font-medium text-gray-400">Horario:</span> {punto.horario}
                            </div>
                            <div className="flex justify-end mt-2">
                              <button className="bg-[#00e5b0] hover:bg-[#00c59a] text-[#0a1929] font-medium px-3 py-1 rounded-md text-xs">
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
          <button className="px-3 py-1 rounded-md bg-[#0f2744] text-gray-300 hover:bg-[#1a3a5f]">
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="px-3 py-1 rounded-md bg-[#00e5b0] text-[#0a1929] font-medium">1</button>
          <button className="px-3 py-1 rounded-md bg-[#0f2744] text-gray-300 hover:bg-[#1a3a5f]">2</button>
          <button className="hidden sm:block px-3 py-1 rounded-md bg-[#0f2744] text-gray-300 hover:bg-[#1a3a5f]">
            3
          </button>
          <span className="hidden sm:block px-3 py-1 text-gray-300">...</span>
          <button className="hidden sm:block px-3 py-1 rounded-md bg-[#0f2744] text-gray-300 hover:bg-[#1a3a5f]">
            8
          </button>
          <button className="px-3 py-1 rounded-md bg-[#0f2744] text-gray-300 hover:bg-[#1a3a5f]">
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  )
}

