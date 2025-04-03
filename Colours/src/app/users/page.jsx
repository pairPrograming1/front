"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function UsersPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
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
              onClick={toggleDetails}
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
          // Vista detallada con sidebar integrada
          <div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.95)", backdropFilter: "blur(5px)" }}
          >
            <div className="flex h-full">
              {/* Sidebar directamente en la vista detallada */}
              <div
                className={`absolute inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{
                  backgroundColor: "rgba(45, 52, 67, 0.95)",
                  borderRight: "1px solid rgba(70, 78, 94, 0.7)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="flex h-16 items-center justify-between px-4"
                  style={{ borderBottom: "1px solid rgba(70, 78, 94, 0.7)" }}
                >
                  <h2 className="text-xl font-semibold text-white">Menú</h2>
                  <button
                    onClick={toggleSidebar}
                    className="rounded-md p-2 text-white hover:bg-opacity-50"
                    style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
                    aria-label="Close sidebar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="mt-4 px-2">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        style={{
                          backgroundColor: "rgba(70, 78, 94, 0.3)",
                          borderLeft: "3px solid #BF8D6B",
                        }}
                      >
                        Área Eventos
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-opacity-20"
                        style={{
                          backgroundColor: "rgba(70, 78, 94, 0.0)",
                          borderLeft: "3px solid transparent",
                        }}
                      >
                        Mi Perfil
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-300 hover:text-white transition-colors hover:bg-opacity-20"
                        style={{
                          backgroundColor: "rgba(70, 78, 94, 0.0)",
                          borderLeft: "3px solid transparent",
                        }}
                      >
                        Configuración
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Contenido principal */}
              <div className="flex-1 overflow-auto">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <button
                      onClick={toggleSidebar}
                      className="mr-4 rounded-md p-2 text-white hover:bg-opacity-50"
                      style={{ backgroundColor: "rgba(70, 78, 94, 0.5)" }}
                      aria-label="Toggle sidebar"
                    >
                      <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">XEVENT</h1>
                  </div>
                </div>

                <div className="px-4 pb-20">
                  <div className="rounded-lg overflow-hidden mb-4 cursor-pointer" onClick={toggleDetails}>
                    <Image
                      src={events[currentSlide].image || "/placeholder.svg"}
                      alt={events[currentSlide].title}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{events[currentSlide].title}</h2>
                  <p className="text-sm text-gray-300 mb-1">{events[currentSlide].area}</p>
                  <p className="text-sm text-gray-300 mb-6">{events[currentSlide].date}</p>

                  <div className="text-sm text-gray-300 space-y-4 mb-6">
                    {events[currentSlide].description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <button
                    className="w-full py-3 rounded-md text-white font-medium mb-10"
                    style={{ backgroundColor: "#BF8D6B" }}
                  >
                    Comprar Entradas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

