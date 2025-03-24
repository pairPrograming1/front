"use client"

import { useState } from "react"

export default function ComprasTable({ compras }) {
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  // Manejar selección de todas las filas
  const handleSelectAll = () => {
    if (selectAll) {
      // Si ya estaban todas seleccionadas, deseleccionar todas
      setSelectedRows([])
    } else {
      // Seleccionar todas las filas
      setSelectedRows(compras.map((compra) => compra.id))
    }
    setSelectAll(!selectAll)
  }

  // Manejar selección individual
  const handleSelectRow = (compraId) => {
    setSelectedRows((prev) => {
      if (prev.includes(compraId)) {
        // Si ya estaba seleccionada, quitarla de la selección
        const newSelected = prev.filter((id) => id !== compraId)
        // Si después de quitar una ya no están todas seleccionadas, actualizar selectAll
        if (newSelected.length !== compras.length) {
          setSelectAll(false)
        }
        return newSelected
      } else {
        // Si no estaba seleccionada, añadirla a la selección
        const newSelected = [...prev, compraId]
        // Si después de añadir una están todas seleccionadas, actualizar selectAll
        if (newSelected.length === compras.length) {
          setSelectAll(true)
        }
        return newSelected
      }
    })
  }

  // Verificar si una fila está seleccionada
  const isSelected = (compraId) => selectedRows.includes(compraId)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#1a3a5f] rounded-lg">
        <thead>
          <tr className="bg-[#1a3a5f]">
            <th className="w-10 p-2 text-left">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#00e5b0] rounded"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-2 text-left text-xs font-medium text-gray-300">Nombre del Evento</th>
            <th className="p-2 text-left text-xs font-medium text-gray-300">Fecha del Evento</th>
            <th className="p-2 text-left text-xs font-medium text-gray-300">Tipo de Entrada</th>
            <th className="p-2 text-left text-xs font-medium text-gray-300">Cantidad</th>
            <th className="p-2 text-left text-xs font-medium text-gray-300">Importe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a3a5f]">
          {compras.map((compra) => (
            <tr key={compra.id} className="hover:bg-[#1a3a5f]">
              <td className="p-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#00e5b0] rounded"
                  checked={isSelected(compra.id)}
                  onChange={() => handleSelectRow(compra.id)}
                />
              </td>
              <td className="p-2 text-sm text-gray-300">{compra.nombre}</td>
              <td className="p-2 text-sm text-gray-300">{compra.fecha}</td>
              <td className="p-2 text-sm text-gray-300">{compra.tipo}</td>
              <td className="p-2 text-sm text-gray-300">{compra.cantidad}</td>
              <td className="p-2 text-sm text-gray-300">{compra.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


  
  