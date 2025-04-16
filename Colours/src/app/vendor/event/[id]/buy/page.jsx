"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuyTicketsPage({ params }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [tickets, setTickets] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    whatsapp: "",
    email: "",
  })
  const [eventId, setEventId] = useState("1")

  useEffect(() => {
    setMounted(true)

    // Extraer el ID de la URL en lugar de usar params
    const pathname = window.location.pathname
    const idMatch = pathname.match(/\/vendor\/event\/([^/]+)/)
    if (idMatch && idMatch[1]) {
      setEventId(idMatch[1])
    }

    setTickets([
      { id: 1, name: "Nombre del Graduado" },
      { id: 2, name: "Nombre del Graduado" },
      { id: 3, name: "Nombre del Graduado" },
    ])
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSell = () => {
    // Redirigir a la página de selección de tickets
    router.push(`/vendor/event/tickets/${eventId}`)
  }

  const isFormValid = () => {
    return formData.name && formData.dni && formData.whatsapp && formData.email
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
        <h2 className="text-xl font-semibold text-white mb-6">Datos del Comprador</h2>

        <div className="space-y-3 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre y Apellido"
            className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              placeholder="DNI"
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
            />
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="WhatsApp"
              className="w-full px-3 py-2 bg-transparent border border-[#b3964c] rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#b3964c]"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
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
                disabled={!isFormValid()}
                className={`px-3 py-1 ${
                  isFormValid() ? "bg-[#b3964c] hover:bg-[#9a7f41]" : "bg-gray-600 cursor-not-allowed"
                } text-black font-medium rounded-md transition-colors ml-auto`}
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

