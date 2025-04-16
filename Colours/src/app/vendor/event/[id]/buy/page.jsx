"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuyTicketsPage({ params }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [tickets, setTickets] = useState([])
  const [eventId, setEventId] = useState(null)

  useEffect(() => {
    // Acceder a params de manera segura dentro de useEffect
    if (params) {
      setEventId(String(params.id || "1"))
    }

    setMounted(true)
    setTickets([
      { id: 1, name: "Nombre del Graduado" },
      { id: 2, name: "Nombre del Graduado" },
      { id: 3, name: "Nombre del Graduado" },
    ])
  }, [params])

  const handleSell = () => {
    // Aquí iría la lógica para procesar la venta
    // Por ahora solo mostraremos una alerta
    alert("Venta procesada con éxito")
  }

  if (!mounted) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg">
          <p className="text-white">Cargando...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
      <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6">Buscar Evento</h2>

        <div className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Nombre y Apellido"
            className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="DNI"
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
            />
            <input
              type="text"
              placeholder="WhatsApp"
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
          />
        </div>

        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex justify-between items-center border border-[#b3964c] rounded-md p-3 w-full"
            >
              <div className="text-white">
                <p className="font-medium">{ticket.name}</p>
              </div>
              <button
                onClick={handleSell}
                className="px-3 py-1 bg-[#b3964c] hover:bg-[#9a7f41] text-black font-medium rounded-md transition-colors ml-auto"
              >
                Vender
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
