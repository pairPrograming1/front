"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function EventsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Aseguramos que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  const events = [
    {
      id: 1,
      title: "Sagrado Corazón",
      date: "Sábado 23 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=300&width=400",
      area: "Área Eventos",
    },
    {
      id: 2,
      title: "Colegio San Martín",
      date: "Viernes 15 de Diciembre a las 21hs",
      image: "/placeholder.svg?height=300&width=400",
      area: "Área Eventos",
    },
    {
      id: 3,
      title: "Colegio del Sol",
      date: "Sábado 20 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=300&width=400",
      area: "Área Eventos",
    },
    {
      id: 4,
      title: "Colegio Santa María",
      date: "Domingo 17 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=300&width=400",
      area: "Área Eventos",
    },
    {
      id: 5,
      title: "Escuela Técnica",
      date: "Lunes 18 de Diciembre a las 19:30hs",
      image: "/placeholder.svg?height=300&width=400",
      area: "Área Eventos",
    },
  ]

  const handleEventClick = (id) => {
    router.push(`/users/events/${id}`)
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div className="p-4 text-white">
        <h1 className="mb-6 text-2xl font-bold text-white">Área Eventos</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((id) => (
            <div
              key={id}
              className="rounded-lg h-64 animate-pulse"
              style={{ backgroundColor: "rgba(70, 78, 94, 0.7)" }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 text-white">
      <h1 className="mb-6 text-2xl font-bold text-white">Área Eventos</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} onClick={() => handleEventClick(event.id)} className="cursor-pointer">
            <div
              className="overflow-hidden rounded-lg transition-transform hover:scale-105 shadow-md"
              style={{
                backgroundColor: "rgba(70, 78, 94, 0.7)",
                backdropFilter: "blur(5px)",
                borderLeft: "3px solid #BF8D6B",
              }}
            >
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{event.title}</h2>
                <p className="text-sm text-gray-300">{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

