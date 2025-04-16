"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Datos estáticos para evitar problemas de hidratación
const staticEvents = [
  {
    id: 1,
    name: "Nombre del Evento 1",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 2,
    name: "Nombre del Evento 2",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 3,
    name: "Nombre del Evento 3",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 4,
    name: "Nombre del Evento 4",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 5,
    name: "Nombre del Evento 5",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 6,
    name: "Nombre del Evento 6",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 7,
    name: "Nombre del Evento 7",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
  {
    id: 8,
    name: "Nombre del Evento 8",
    location: "Lugar del Evento",
    date: "Fecha del evento",
  },
]

export default function EventSearchPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [events, setEvents] = useState([])

  // Solo cargar los eventos después de que el componente esté montado
  useEffect(() => {
    setMounted(true)
    setEvents(staticEvents)
  }, [])

  // No renderizar nada hasta que el componente esté montado
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
        <h2 className="text-xl font-semibold text-white mb-4">Buscar Evento</h2>

        <div className="space-y-3 mb-8">
          <input
            type="text"
            placeholder="Por nombre"
            className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              defaultValue=""
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#b3964c] appearance-none"
            >
              <option value="" disabled className="bg-[#1e2130]">
                Fecha
              </option>
              <option value="today" className="bg-[#1e2130]">
                Hoy
              </option>
              <option value="tomorrow" className="bg-[#1e2130]">
                Mañana
              </option>
              <option value="weekend" className="bg-[#1e2130]">
                Este fin de semana
              </option>
              <option value="month" className="bg-[#1e2130]">
                Este mes
              </option>
            </select>

            <select
              defaultValue=""
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#b3964c] appearance-none"
            >
              <option value="" disabled className="bg-[#1e2130]">
                Graduaciones
              </option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Lugar del Evento"
            className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
          />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#b3964c] to-transparent my-6"></div>

        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center border border-[#b3964c] rounded-md p-3 w-full"
            >
              <div className="text-white">
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-400">
                  {event.location} - {event.date}
                </p>
              </div>
              <button
                onClick={() => router.push(`/vendor/event/${event.id}`)}
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

