"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import SalonCard from "@/app/components/salones/salon-card"
import SalonForm from "@/app/components/salones/salon-form"
import VendedorCard from "@/app/components/salones/vendedor-card"
import TiposCobro from "@/app/components/salones/tipos-cobro"

export default function SalonesPage() {
  const [activeTab, setActiveTab] = useState("informacion")

  // Datos de ejemplo
  const salones = [{ id: 1, nombre: "aires", imagen: "/placeholder.svg?height=80&width=150" }]

  const vendedores = [
    {
      id: 1,
      nombre: "Uriel Casado",
      telefono: "3416789012",
      whatsapp: "3416789012",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white">Colour Rosario</h1>
        <button className="bg-[#1a3a5f] hover:bg-[#2a4a6f] text-white px-4 py-2 rounded-md text-sm">Volver</button>
      </div>

      <SalonForm />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0f2744] rounded-lg p-5">
            <h2 className="text-lg font-medium text-white mb-4">Salones Habilitados</h2>
            <div className="grid grid-cols-2 gap-4">
              {salones.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
              <button className="border-2 border-dashed border-[#1a3a5f] rounded-lg flex items-center justify-center h-[100px] hover:border-[#00e5b0] transition-colors">
                <Plus size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-[#0f2744] rounded-lg p-5">
            <h2 className="text-lg font-medium text-white mb-4">Tipos de Cobro</h2>
            <TiposCobro />
          </div>
        </div>

        <div className="mt-6 bg-[#0f2744] rounded-lg p-5">
          <h2 className="text-lg font-medium text-white mb-4">Vendedores asignados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {vendedores.map((vendedor) => (
              <VendedorCard key={vendedor.id} vendedor={vendedor} />
            ))}
            <button className="border-2 border-dashed border-[#1a3a5f] rounded-lg flex items-center justify-center h-[100px] hover:border-[#00e5b0] transition-colors">
              <Plus size={24} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

