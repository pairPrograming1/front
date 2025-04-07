"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Share2, Menu } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectTickets, setEventId } from "@/lib/slices/ticketsSlice"
import Modal from "@/app/components/user/adultChildModal"

export default function MyTicketsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState("Hernán Gulliano")

  // Redux
  const dispatch = useDispatch()
  const ticketsData = useSelector(selectTickets)

  // Estados para los modales
  const [showAdultModal, setShowAdultModal] = useState(false)
  const [showChildModal, setShowChildModal] = useState(false)
  const [currentTicketIndex, setCurrentTicketIndex] = useState(null)

  // Estados para los formularios
  const [adultForm, setAdultForm] = useState({
    name: "",
    dni: "",
    email: "",
    whatsapp: "",
  })

  const [childForm, setChildForm] = useState({
    name: "",
    dni: "",
  })

  // Extraer el ID de manera segura
  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/")
      const id = pathSegments[pathSegments.length - 1]
      dispatch(setEventId(id))
    }
  }, [pathname, dispatch])

  // Generar un array de entradas basado en las cantidades
  const generateTickets = () => {
    const ticketList = []

    // Añadir entradas de adultos
    for (let i = 0; i < ticketsData.adults; i++) {
      ticketList.push({ type: "Adulto", assigned: false, assignedTo: null })
    }

    // Añadir entradas de menores
    for (let i = 0; i < ticketsData.children; i++) {
      ticketList.push({ type: "Menores", assigned: false, assignedTo: null })
    }

    // Añadir entradas de adultos sin cargo
    for (let i = 0; i < ticketsData.freeAdults; i++) {
      ticketList.push({ type: "Adulto sin Cargo", assigned: false, assignedTo: null })
    }

    // Añadir entradas de menores sin cargo
    for (let i = 0; i < ticketsData.freeChildren; i++) {
      ticketList.push({ type: "Menores sin Cargo", assigned: false, assignedTo: null })
    }

    return ticketList
  }

  const [ticketList, setTicketList] = useState([])

  useEffect(() => {
    setMounted(true)
    setTicketList(generateTickets())
  }, [ticketsData])

  // Manejar la apertura del modal según el tipo de entrada
  const handleAssignTicket = (index) => {
    setCurrentTicketIndex(index)

    if (ticketList[index].type.includes("Adulto")) {
      setShowAdultModal(true)
    } else {
      setShowChildModal(true)
    }
  }

  // Manejar cambios en el formulario de adultos
  const handleAdultFormChange = (e) => {
    const { name, value } = e.target
    setAdultForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejar cambios en el formulario de menores
  const handleChildFormChange = (e) => {
    const { name, value } = e.target
    setChildForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Asignar entrada de adulto
  const assignAdultTicket = () => {
    if (currentTicketIndex === null) return

    const updatedTickets = [...ticketList]
    updatedTickets[currentTicketIndex].assigned = true
    updatedTickets[currentTicketIndex].assignedTo = adultForm

    setTicketList(updatedTickets)
    setShowAdultModal(false)
    setAdultForm({ name: "", dni: "", email: "", whatsapp: "" })
  }

  // Asignar entrada de menor
  const assignChildTicket = () => {
    if (currentTicketIndex === null) return

    const updatedTickets = [...ticketList]
    updatedTickets[currentTicketIndex].assigned = true
    updatedTickets[currentTicketIndex].assignedTo = childForm

    setTicketList(updatedTickets)
    setShowChildModal(false)
    setChildForm({ name: "", dni: "" })
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div className="flex min-h-full w-full flex-col">
        <div className="w-full animate-pulse">
          <div className="h-16 bg-gray-700 mb-6"></div>
          <div className="p-4">
            <div className="h-8 w-1/2 bg-gray-700 mb-6 rounded"></div>
            <div className="h-12 bg-gray-700 rounded-lg mb-4"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full w-full flex-col" style={{ backgroundColor: "#2D3443" }}>
     

      <div className="p-4">
        {/* Título */}
        <h2 className="text-2xl font-bold text-white mb-6">Mis entradas</h2>

        {/* Nombre del usuario */}
        <div className="flex items-center justify-between p-3 rounded-md mb-6" style={{ backgroundColor: "#BF8D6B" }}>
          <span className="text-[#2D3443] font-medium">{userName}</span>
          <button className="text-[#2D3443]" aria-label="Compartir">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Lista de entradas */}
        <div className="space-y-4">
          {ticketList.map((ticket, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md border-2 border-dashed"
              style={{
                backgroundColor: "rgba(45, 52, 67, 0.7)",
                borderColor: "#BF8D6B",
                opacity: ticket.assigned ? 0.7 : 1,
              }}
            >
              <div>
                <span className="text-white">{ticket.type}</span>
                {ticket.assigned && <p className="text-sm text-gray-300 mt-1">Asignada a: {ticket.assignedTo.name}</p>}
              </div>
              <button
                onClick={() => handleAssignTicket(index)}
                className="px-3 py-1 rounded text-white text-sm"
                style={{ backgroundColor: "rgba(70, 78, 94, 0.7)" }}
              >
                {ticket.assigned ? "Reasignar" : "Asignar Entrada"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para Adultos */}
      <Modal isOpen={showAdultModal} onClose={() => setShowAdultModal(false)} title="Adulto">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            assignAdultTicket()
          }}
        >
          <div>
            <input
              type="text"
              name="name"
              value={adultForm.name}
              onChange={handleAdultFormChange}
              placeholder="Nombre y Apellido"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="dni"
              value={adultForm.dni}
              onChange={handleAdultFormChange}
              placeholder="DNI"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={adultForm.email}
              onChange={handleAdultFormChange}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="whatsapp"
              value={adultForm.whatsapp}
              onChange={handleAdultFormChange}
              placeholder="WhatsApp"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-md text-[#2D3443] font-medium"
            style={{ backgroundColor: "#BF8D6B" }}
          >
            Asignar Entrada
          </button>
        </form>
      </Modal>

      {/* Modal para Menores */}
      <Modal isOpen={showChildModal} onClose={() => setShowChildModal(false)} title="Menor">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            assignChildTicket()
          }}
        >
          <div>
            <input
              type="text"
              name="name"
              value={childForm.name}
              onChange={handleChildFormChange}
              placeholder="Nombre y Apellido"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="dni"
              value={childForm.dni}
              onChange={handleChildFormChange}
              placeholder="DNI"
              className="w-full p-3 rounded-md bg-transparent text-white"
              style={{ border: "1px solid #BF8D6B" }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-md text-[#2D3443] font-medium"
            style={{ backgroundColor: "#BF8D6B" }}
          >
            Asignar Entrada
          </button>
        </form>
      </Modal>
    </div>
  )
}




