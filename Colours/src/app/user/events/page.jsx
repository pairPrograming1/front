import Image from "next/image"
import Link from "next/link"

export default function EventsPage() {
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
      title: "Instituto Nacional",
      date: "Jueves 21 de Diciembre a las 19hs",
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

  return (
    <div className="bg-xevent-dark p-4 text-xevent-light font-manrope">
      <h1 className="mb-6 text-2xl font-bold text-xevent-light">Área Eventos</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link href={`/users/events/${event.id}`} key={event.id}>
            <div className="overflow-hidden rounded-lg bg-xevent-medium transition-transform hover:scale-105">
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-xevent-light">{event.title}</h2>
                <p className="text-sm text-xevent-lightgray">{event.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

