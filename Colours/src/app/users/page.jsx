"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UsersPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  // Añadir un estado para simular si el usuario ya tiene entradas
  const [hasTickets, setHasTickets] = useState(false)

  // Aseguramos que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  const events = [
    {
      id: 1,
      title: "Sagrado Corazón",
      date: "Sábado 23 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

      Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    },
    {
      id: 2,
      title: "Colegio San Martín",
      date: "Viernes 15 de Diciembre a las 21hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

      Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    },
    {
      id: 3,
      title: "Colegio del Sol",
      date: "Sábado 20 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

      Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    },
    {
      id: 4,
      title: "Colegio Santa María",
      date: "Domingo 17 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

      Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    },
    {
      id: 5,
      title: "Escuela Técnica",
      date: "Lunes 18 de Diciembre a las 19:30hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet pharetra lorem. Curabitur vitae arcu nulla. Cras mattis tellus et ultrices, quis pharetra tortor viverra. Donec semper sed massa sed suscipit. Nullam porta lectus volutpat facilisis ultrices. Maecenas suscipit ex et tellus sodales, et facilisis libero tincidunt. Mauris vitae tempus metus. Aliquam sed varius leo. Sed eu dictum lectus, quis viverra sapien. Donec euismod a urna id feugiat. Fusce venenatis erat erat, ac tempus libero imperdiet id. Morbi quis nunc magna. Vestibulum accumsan eros nec gravida molestie.

      Suspendisse elementum, risus eget efficitur porta, elit lectus consectetur lacus, id viverra odio sapien sit amet nisl. Duis commodo mauris tristique lectus maximus, a dictum dui convallis. Curabitur elementum elit ligula quis cursus. Pellentesque bibendum sit amet sapien et facilisis. Maecenas lobortis, arcu sed sagittis lacinia, felis dui ultrices dolor, a ultrices enim mauris a justo. Proin a nisl maximus, hendrerit semper, mattis mauris. Curabitur mattis placerat nunc, quis vestibulum massa blandit quis.`,
    },
  ]

  const openDetails = () => {
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Modificar la función handleBuyTickets para que tenga en cuenta si el usuario ya tiene entradas
  const handleBuyTickets = () => {
    if (hasTickets) {
      // Si ya tiene entradas, redirigir a la página de "Mis Entradas"
      router.push(`/users/my-tickets/${events[currentSlide].id}`)
    } else {
      // Si no tiene entradas, redirigir a la página de compra
      router.push(`/users/tickets/${events[currentSlide].id}`)
    }
  }

  // Añadir un botón para simular la compra de entradas (solo para demostración)
  const toggleTicketStatus = () => {
    setHasTickets((prev) => !prev)
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-4">
        <div className="relative mx-auto w-full max-w-md px-4">
          <div
            className="rounded-lg shadow-lg aspect-[3/4] w-full"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.5)" }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-full flex-col items-center justify-center py-4 ${showDetails ? "overflow-hidden" : ""}`}>
      <div className="relative mx-auto w-full max-w-md px-4">
        {!showDetails ? (
          // Vista de carrusel
          <>
            <div
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
              style={{ backgroundColor: "rgba(45, 52, 67, 0.5)", backdropFilter: "blur(5px)" }}
              onClick={openDetails}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <div className="absolute top-4 left-0 right-0 text-center text-sm font-medium text-white z-10">
                  {events[currentSlide].area}
                </div>
                <Image
                  src={events[currentSlide].image || "/placeholder.svg"}
                  alt={events[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-center"
                  style={{ backgroundColor: "rgba(32, 32, 32, 0.8)", backdropFilter: "blur(5px)" }}
                >
                  <h2 className="text-xl font-bold text-white">{events[currentSlide].title}</h2>
                  <p className="text-sm text-gray-300">{events[currentSlide].date}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full`}
                  style={{
                    backgroundColor: currentSlide === index ? "#BF8D6B" : "rgba(70, 78, 94, 0.7)",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          // Vista detallada con estilo similar a la página de eventos
          <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#2D3443" }}>
            {/* Header con botón de volver */}
            <div className="flex items-center p-4">
              <button
                onClick={closeDetails}
                className="rounded-md p-2 text-white hover:bg-opacity-50"
                style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
                aria-label="Volver"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-white">XEVENT</h1>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 overflow-auto p-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src={events[currentSlide].image || "/placeholder.svg"}
                  alt={events[currentSlide].title}
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>

              <h2 className="text-xl font-bold text-white mb-1">{events[currentSlide].title}</h2>
              <p className="text-sm text-[#EDEEF0] mb-1">{events[currentSlide].area}</p>
              <p className="text-sm text-[#EDEEF0] mb-6">{events[currentSlide].date}</p>

              <div className="text-sm text-[#EDEEF0] space-y-4 mb-6">
                {events[currentSlide].description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Botón de comprar entradas */}
            <div className="p-4 mt-auto">
              <button
                className="w-full py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: "#BF8D6B" }}
                onClick={handleBuyTickets}
              >
                {hasTickets ? "Mis Entradas" : "Comprar Entradas"}
              </button>

              {/* Botón para simular cambio de estado (solo para demostración) */}
              <button
                className="w-full mt-2 py-2 rounded-md text-white font-medium text-sm"
                style={{ backgroundColor: "rgba(70, 78, 94, 0.7)", border: "1px solid #BF8D6B" }}
                onClick={toggleTicketStatus}
              >
                {hasTickets ? "Simular: No tengo entradas" : "Simular: Ya compré entradas"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

