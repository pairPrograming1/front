"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import apiUrls from "@/app/components/utils/apiConfig"
import {
  setEventId,
  setTicketData,
  incrementTicket,
  decrementTicket,
  selectTickets,
  selectPrices,
  selectSubtotal,
  selectTotal,
} from "@/lib/slices/ticketsSlice"
import OrdenCompraModal from "@/app/components/entradas/ordenCompraModal"

// Definir API_URL una sola vez
const API_URL = apiUrls

export default function TicketPurchasePage() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [buyerData, setBuyerData] = useState(null)
  const [eventData, setEventData] = useState(null)
  const [ticketTypes, setTicketTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSummary, setShowSummary] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState(null)

  // Redux
  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const prices = useSelector(selectPrices)
  const subtotal = useSelector(selectSubtotal)
  const total = useSelector(selectTotal)

  // Extraer el ID de manera segura
  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/")
      const id = pathSegments[pathSegments.length - 1]
      dispatch(setEventId(id))

      // Cargar datos del comprador desde localStorage
      const savedBuyerData = localStorage.getItem("buyerData")
      if (savedBuyerData) {
        setBuyerData(JSON.parse(savedBuyerData))
      } else {
        // Si no hay datos del comprador, redirigir a la página de compra
        router.push(`/vendor/event/${id}/buy`)
      }

      // Cargar datos del evento y tickets disponibles
      fetchEventData(id)
      fetchTicketData(id)
    }
  }, [pathname, dispatch, router])

  // Función para obtener datos del evento
  const fetchEventData = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/evento/${id}`)
      const data = await response.json()

      if (data.success) {
        setEventData(data.data)
      }
    } catch (error) {
      console.error("Error fetching event data:", error)
    }
  }

  // Modificar la función fetchTicketData para guardar los datos de tickets en Redux
  const fetchTicketData = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/entrada/${id}`)
      const data = await response.json()

      if (data.success) {
        setTicketTypes(data.data)
        // Guardar los datos completos de los tickets en Redux
        dispatch(setTicketData(data.data))
      }
    } catch (error) {
      console.error("Error fetching ticket data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Actualizar cantidad de entradas
  const updateTicketCount = (type, increment) => {
    if (increment > 0) {
      dispatch(incrementTicket(type))
    } else {
      dispatch(decrementTicket(type))
    }
  }

  // Preparar los datos para la orden
  const prepareOrderData = () => {
    if (!buyerData) return null

    // Crear el array de detalles con los tickets seleccionados
    const detalles = Object.entries(tickets)
      .filter(([_, cantidad]) => cantidad > 0)
      .map(([entradaId, cantidad]) => {
        const ticketInfo = ticketTypes.find((t) => t.id === entradaId)
        return {
          entradaId,
          cantidad,
          precio_unitario: Number.parseFloat(ticketInfo?.precio || 0),
        }
      })

    return {
      estado: "pendiente",
      dni_cliente: buyerData.dni,
      nombre_cliente: buyerData.name,
      email_cliente: buyerData.email,
      telefono_cliente: buyerData.whatsapp,
      detalles,
    }
  }

  // Enviar la orden al API
  const submitOrder = async () => {
    const orderData = prepareOrderData()
    if (!orderData) return

    setIsSubmitting(true)
    setOrderError(null)

    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (response.ok) {
        setOrderSuccess(true)
        // Guardar la respuesta de la orden si es necesario
        localStorage.setItem("orderResponse", JSON.stringify(data))
      } else {
        setOrderError(data.message || "Error al procesar la orden")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      setOrderError("Error de conexión al procesar la orden")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Proceder a la orden de compra
  const proceedToOrder = () => {
    setShowSummary(true)
    submitOrder()
  }

  // Cerrar el modal
  const closeSummary = () => {
    setShowSummary(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderizamos un esqueleto básico durante la hidratación o carga
  if (!mounted || loading) {
    return (
      <div className="flex min-h-full w-full flex-col items-center p-4">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-8 w-3/4 bg-gray-700 mb-2 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-700 mb-6 rounded"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Obtener los tickets seleccionados para mostrar en el resumen
  const selectedTickets = Object.entries(tickets)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const ticketInfo = ticketTypes.find((t) => t.id === id)
      return {
        id,
        tipo: ticketInfo?.tipo_entrada || "Entrada",
        precio: Number.parseFloat(ticketInfo?.precio || 0),
        cantidad: count,
        subtotal: Number.parseFloat(ticketInfo?.precio || 0) * count,
      }
    })

  return (
    <div className="flex min-h-full w-full flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Datos del comprador */}
        {buyerData && (
          <div className="mb-4 p-3 rounded-md border border-[#BF8D6B] bg-[#2D3443]/70">
            <h3 className="text-white text-sm font-medium mb-2">Datos del Comprador</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#EDEEF0]">
              <div>
                <p className="text-gray-400">Nombre:</p>
                <p>{buyerData.name}</p>
              </div>
              <div>
                <p className="text-gray-400">DNI:</p>
                <p>{buyerData.dni}</p>
              </div>
              <div>
                <p className="text-gray-400">WhatsApp:</p>
                <p>{buyerData.whatsapp}</p>
              </div>
              <div>
                <p className="text-gray-400">Email:</p>
                <p className="truncate">{buyerData.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Imagen del evento */}
        <div className="rounded-lg overflow-hidden mb-4 border border-[#BF8D6B]">
          <img
            src={eventData?.image || "/placeholder.svg?height=300&width=400&query=event"}
            alt={eventData?.nombre || "Evento"}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Información del evento */}
        <h1 className="text-2xl font-bold text-white mb-1">{eventData?.nombre || "Cargando evento..."}</h1>
        <p className="text-sm text-[#EDEEF0] mb-1">{eventData?.lugar || "Área Eventos"}</p>
        <p className="text-sm text-[#EDEEF0] mb-6">{eventData?.fecha || "Fecha por confirmar"}</p>

        {/* Selección de entradas */}
        <div className="space-y-3 mb-6">
          {ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-3 rounded-md border border-[#BF8D6B]"
              style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
            >
              <div>
                <span className="text-[#EDEEF0]">{ticket.tipo_entrada}</span>
                <p className="text-xs text-gray-400">${Number.parseFloat(ticket.precio).toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateTicketCount(ticket.id, -1)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                  style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="mx-4 text-white w-4 text-center">{tickets[ticket.id] || 0}</span>
                <button
                  onClick={() => updateTicketCount(ticket.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                  style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                  aria-label="Aumentar cantidad"
                  disabled={tickets[ticket.id] >= ticket.cantidad}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {ticketTypes.length === 0 && (
            <div className="p-3 rounded-md border border-[#BF8D6B] text-center text-[#EDEEF0]">
              No hay entradas disponibles para este evento
            </div>
          )}
        </div>

        {/* Resumen de costos */}
        <div
          className="p-4 rounded-md border border-dashed border-[#BF8D6B] mb-4"
          style={{ backgroundColor: "rgba(45, 52, 67, 0.5)" }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-[#EDEEF0]">Subtotal</span>
            <span className="text-white">{subtotal.toLocaleString()}$</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#EDEEF0] text-sm">+ Cargo de Servicio</span>
            <span className="text-white">{prices.serviceCharge.toLocaleString()}$</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between p-3 rounded-md mb-6 bg-[#EDEEF0]">
          <span className="font-medium text-[#202020]">Total a pagar</span>
          <span className="font-bold text-[#202020]">{total.toLocaleString()}$</span>
        </div>

        {/* Botón de pago */}
        <button
          onClick={proceedToOrder}
          disabled={Object.values(tickets).every((count) => count === 0) || isSubmitting}
          className={`w-full rounded-md py-3 font-medium text-white mb-4 ${
            Object.values(tickets).every((count) => count === 0) || isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#BF8D6B]"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </span>
          ) : (
            "Orden de compra"
          )}
        </button>
      </div>

      {/* Modal de resumen de compra como componente separado */}
      <OrdenCompraModal
        isOpen={showSummary}
        onClose={closeSummary}
        buyerData={buyerData}
        eventData={eventData}
        selectedTickets={selectedTickets}
        subtotal={subtotal}
        serviceCharge={prices.serviceCharge}
        total={total}
        orderSuccess={orderSuccess}
        orderError={orderError}
      />
    </div>
  )
}




