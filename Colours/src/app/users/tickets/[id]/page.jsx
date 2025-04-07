"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import {
  setEventId,
  incrementTicket,
  decrementTicket,
  selectTickets,
  selectPrices,
  selectSubtotal,
  selectTotal,
} from "@/lib/slices/ticketsSlice"

export default function TicketPurchasePage() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

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
    }
  }, [pathname, dispatch])

  // Evento simulado
  const getEventData = () => {
    return {
      id: pathname ? pathname.split("/").pop() : null,
      title: "Colegio del Sol",
      date: "Sábado 20 de Diciembre a las 20hs",
      image: "/placeholder.svg?height=400&width=600",
      area: "Área Eventos",
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

  // Proceder al pago
  const proceedToPayment = () => {
    // Redirigir a la página de pago
    router.push(`/users/payment/${getEventData().id}`)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
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

  const event = getEventData()

  return (
    <div className="flex min-h-full w-full flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Imagen del evento */}
        <div className="rounded-lg overflow-hidden mb-4 border border-[#BF8D6B]">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>

        {/* Información del evento */}
        <h1 className="text-2xl font-bold text-white mb-1">{event.title}</h1>
        <p className="text-sm text-[#EDEEF0] mb-1">{event.area}</p>
        <p className="text-sm text-[#EDEEF0] mb-6">{event.date}</p>

        {/* Selección de entradas */}
        <div className="space-y-3 mb-6">
          {/* Adultos */}
          <div
            className="flex items-center justify-between p-3 rounded-md border border-[#BF8D6B]"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
          >
            <span className="text-[#EDEEF0]">Adultos</span>
            <div className="flex items-center">
              <button
                onClick={() => updateTicketCount("adults", -1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="mx-4 text-white w-4 text-center">{tickets.adults}</span>
              <button
                onClick={() => updateTicketCount("adults", 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Menores */}
          <div
            className="flex items-center justify-between p-3 rounded-md border border-[#BF8D6B]"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
          >
            <span className="text-[#EDEEF0]">Menores</span>
            <div className="flex items-center">
              <button
                onClick={() => updateTicketCount("children", -1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="mx-4 text-white w-4 text-center">{tickets.children}</span>
              <button
                onClick={() => updateTicketCount("children", 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Adultos sin Cargo */}
          <div
            className="flex items-center justify-between p-3 rounded-md border border-[#BF8D6B]"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
          >
            <span className="text-[#EDEEF0]">Adultos sin Cargo</span>
            <div className="flex items-center">
              <button
                onClick={() => updateTicketCount("freeAdults", -1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="mx-4 text-white w-4 text-center">{tickets.freeAdults}</span>
              <button
                onClick={() => updateTicketCount("freeAdults", 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Menores sin Cargo */}
          <div
            className="flex items-center justify-between p-3 rounded-md border border-[#BF8D6B]"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
          >
            <span className="text-[#EDEEF0]">Menores sin Cargo</span>
            <div className="flex items-center">
              <button
                onClick={() => updateTicketCount("freeChildren", -1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="mx-4 text-white w-4 text-center">{tickets.freeChildren}</span>
              <button
                onClick={() => updateTicketCount("freeChildren", 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-white font-bold text-xl"
                style={{ backgroundColor: "#2D3443", border: "1px solid #BF8D6B" }}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>
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
          onClick={proceedToPayment}
          className="w-full rounded-md py-3 font-medium text-white mb-4"
          style={{ backgroundColor: "#BF8D6B" }}
        >
          Elegir medio de pago
        </button>
      </div>
    </div>
  )
}






