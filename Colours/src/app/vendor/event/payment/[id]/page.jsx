"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, Check } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  setPaymentMethod,
  completePayment,
  selectSubtotal,
  selectTotal,
  selectPrices,
  selectPaymentMethod,
} from "@/lib/slices/ticketsSlice"

export default function PaymentPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Redux
  const dispatch = useDispatch()
  const subtotal = useSelector(selectSubtotal)
  const total = useSelector(selectTotal)
  const prices = useSelector(selectPrices)
  const paymentMethod = useSelector(selectPaymentMethod)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePaymentMethodChange = (method) => {
    dispatch(setPaymentMethod(method))
  }

  const handlePayment = () => {
    // En una aplicación real, aquí procesaríamos el pago
    dispatch(completePayment())

    // Redirigir a la página de mis entradas
    const eventId = pathname ? pathname.split("/").pop() : null
    router.push(`/users/my-tickets/${eventId}`)
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div className="flex min-h-full w-full flex-col">
        <div className="w-full animate-pulse">
          <div className="h-16 bg-gray-700 mb-6"></div>
          <div className="p-4">
            <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-12 bg-gray-700 rounded mb-4"></div>
            <div className="h-12 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-4 mt-6">
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
      

      <div className="p-4 flex flex-col items-center">
        {/* Imagen del evento */}
        <div className="w-full max-w-md rounded-lg overflow-hidden mb-6 border border-[#BF8D6B]">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Evento"
            width={400}
            height={200}
            className="w-full object-cover"
          />
        </div>

        {/* Resumen de costos */}
        <div className="w-full max-w-md">
          <div
            className="flex justify-between p-3 rounded-md border-2 border-dashed mb-2"
            style={{ backgroundColor: "rgba(45, 52, 67, 0.7)", borderColor: "#BF8D6B" }}
          >
            <div className="text-white">
              <span>Subtotal</span>
              <p className="text-xs text-gray-300">+ Cargo de Servicio</p>
            </div>
            <div className="text-right">
              <span className="text-white">{subtotal.toLocaleString()}$</span>
              <p className="text-xs text-gray-300">{prices.serviceCharge.toLocaleString()}$</p>
            </div>
          </div>

          <div className="flex justify-between p-3 rounded-md mb-6 bg-[#EDEEF0]">
            <span className="font-medium text-[#202020]">Total a pagar</span>
            <span className="font-bold text-[#202020]">{total.toLocaleString()}$</span>
          </div>

          {/* Opciones de pago */}
          <div className="space-y-4 mb-6">
            <div
              className={`flex justify-between p-3 rounded-md border ${paymentMethod === "mercadopago" ? "border-[#BF8D6B]" : "border-[#464E5E]"}`}
              style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
              onClick={() => handlePaymentMethodChange("mercadopago")}
            >
              <span className="text-white">Pagar con Mercado Pago</span>
              <div
                className={`w-6 h-6 rounded border flex items-center justify-center ${paymentMethod === "mercadopago" ? "border-[#BF8D6B] bg-[#BF8D6B]" : "border-[#464E5E]"}`}
              >
                {paymentMethod === "mercadopago" && <Check className="h-4 w-4 text-[#2D3443]" />}
              </div>
            </div>

            <div
              className="flex justify-between p-3 rounded-md border border-[#464E5E] opacity-50"
              style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
            >
              <span className="text-white">Tarjeta de crédito (Próximamente)</span>
              <div className="w-6 h-6 rounded border border-[#464E5E]"></div>
            </div>

            <div
              className="flex justify-between p-3 rounded-md border border-[#464E5E] opacity-50"
              style={{ backgroundColor: "rgba(45, 52, 67, 0.7)" }}
            >
              <span className="text-white">Transferencia (Próximamente)</span>
              <div className="w-6 h-6 rounded border border-[#464E5E]"></div>
            </div>
          </div>

          {/* Botón de pago */}
          <button
            
            className="w-full py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: "#BF8D6B" }}
          >
            Ir a Pagar
          </button>
        </div>
      </div>
    </div>
  )
}

