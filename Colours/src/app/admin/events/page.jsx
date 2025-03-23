"use client"

import { useState } from "react"
import EventForm from "@/app/components/events/event-form"
import ComprasTable from "@/app/components/events/compra-table"
import DetalleCompra from "@/app/components/events/detatlle-compra"

export default function EventosPage() {
  const [activeTab, setActiveTab] = useState("informacion")
  const [selectedCompra, setSelectedCompra] = useState("0001-00000001")

  // Datos de ejemplo para compras
  const compras = [
    {
      id: 1,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 2,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 3,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 4,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 5,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 6,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 7,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 8,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 9,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
    {
      id: 10,
      nombre: "Nombre del Evento",
      fecha: "Fecha del Evento",
      tipo: "Tipo de Entrada",
      cantidad: "Cantidad",
      importe: "Importe",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white">Colour Rosario</h1>
        <button className="bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white px-4 py-2 rounded-md text-sm">Volver</button>
      </div>

      <EventForm />

      <div className="mt-8">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md text-sm ${activeTab === "informacion" ? "bg-[#00e5b0] text-[#0a1929] font-medium" : "bg-[#1a3a5f] text-white"}`}
            onClick={() => setActiveTab("informacion")}
          >
            Información
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${activeTab === "cobros" ? "bg-[#00e5b0] text-[#0a1929] font-medium" : "bg-[#1a3a5f] text-white"}`}
            onClick={() => setActiveTab("cobros")}
          >
            Cobros
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0f2744] rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-white">Compras Realizadas</h2>
              <div className="text-sm text-white">Filtros</div>
            </div>
            <ComprasTable compras={compras} />
          </div>

          <div className="bg-[#0f2744] rounded-lg p-5">
            <DetalleCompra id={selectedCompra} />
          </div>
        </div>
      </div>
    </div>
  )
}


  