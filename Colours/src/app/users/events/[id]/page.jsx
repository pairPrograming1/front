"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export default function EventDetailPage({ params }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [eventId, setEventId] = useState(null)

  useEffect(() => {
    // Extraer el ID de la URL en lugar de acceder directamente a params
    if (pathname) {
      const pathSegments = pathname.split("/")
      const id = pathSegments[pathSegments.length - 1]
      setEventId(id)
    }
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulamos obtener los datos del evento basado en el ID
  const getEventData = () => {
    return {
      id: eventId,
      title: "Colegio del Sol",
      date: "Sábado 20 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=400&width=600",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

    Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    }
  }

  const handleBuyTickets = () => {
    router.push(`/users/tickets/${eventId}`)
  }

  // Renderizamos un esqueleto básico durante la hidratación o si no tenemos eventId
  if (!mounted || !eventId) {
    return (
      <div
        className="flex flex-col min-h-full w-full max-w-md mx-auto"
        style={{ backgroundColor: "rgba(45, 52, 67, 0.95)", backdropFilter: "blur(5px)" }}
      >
        <div className="h-16 animate-pulse bg-gray-700"></div>
        <div className="p-4 flex-1">
          <div className="rounded-lg overflow-hidden mb-4 h-64 animate-pulse bg-gray-700"></div>
          <div className="h-6 w-3/4 animate-pulse bg-gray-700 mb-2"></div>
          <div className="h-4 w-1/2 animate-pulse bg-gray-700 mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 animate-pulse bg-gray-700"></div>
            <div className="h-4 animate-pulse bg-gray-700"></div>
            <div className="h-4 animate-pulse bg-gray-700"></div>
          </div>
        </div>
      </div>
    )
  }

  const event = getEventData()

  return (
    <div
      className="flex flex-col min-h-full w-full max-w-md mx-auto"
      style={{ backgroundColor: "rgba(45, 52, 67, 0.95)", backdropFilter: "blur(5px)" }}
    >
      <div className="p-4 flex-1 overflow-auto">
        <div className="rounded-lg overflow-hidden mb-4">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{event.title}</h2>
        <p className="text-sm text-gray-300 mb-1">{event.area}</p>
        <p className="text-sm text-gray-300 mb-6">{event.date}</p>

        <div className="text-sm text-gray-300 space-y-4">
          {event.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <button
          className="w-full py-3 rounded-md text-white font-medium"
          style={{ backgroundColor: "#BF8D6B" }}
          onClick={handleBuyTickets}
        >
          Comprar Entradas
        </button>
      </div>
    </div>
  )
}

