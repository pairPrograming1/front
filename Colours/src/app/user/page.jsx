"use client"

import { useState } from "react"
import Image from "next/image"

export default function UsersPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const events = [
    {
      id: 1,
      title: "Sagrado Corazón",
      date: "Sábado 23 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
    },
    {
      id: 2,
      title: "Colegio San Martín",
      date: "Viernes 15 de Diciembre a las 21hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
    },
    {
      id: 3,
      title: "Instituto Nacional",
      date: "Jueves 21 de Diciembre a las 19hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
    },
    {
      id: 4,
      title: "Colegio Santa María",
      date: "Domingo 17 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
    },
    {
      id: 5,
      title: "Escuela Técnica",
      date: "Lunes 18 de Diciembre a las 19:30hs",
      image: "/placeholder.svg?height=600&width=400",
      area: "Área Eventos",
    },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-center bg-xevent-dark text-xevent-light font-manrope">
      <div className="relative mx-auto w-full max-w-md px-4">
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <div className="absolute top-4 left-0 right-0 text-center text-sm font-medium text-xevent-light">
              {events[currentSlide].area}
            </div>
            <Image
              src={events[currentSlide].image || "/placeholder.svg"}
              alt={events[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-xevent-black bg-opacity-80 p-4 text-center">
              <h2 className="text-xl font-bold text-xevent-light">{events[currentSlide].title}</h2>
              <p className="text-sm text-xevent-lightgray">{events[currentSlide].date}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-xevent-accent" : "bg-xevent-medium"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

