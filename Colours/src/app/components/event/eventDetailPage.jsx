"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import apiUrls from "@/app/components/utils/apiConfig"
import { ImageOff } from "lucide-react"
import useUserRoleFromLocalStorage from "../hook/userRoleFromLocalstorage"

export default function EventDetailPage({ params }) {
  const API_URL = apiUrls
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [eventId, setEventId] = useState("")
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const { userRole }= useUserRoleFromLocalStorage ();

  useEffect(() => {
    setMounted(true)

    // Extraer el ID de la URL en lugar de usar params
    const pathname = window.location.pathname
    console.log(pathname)
    let idMatch = null
    if (userRole === "vendor") idMatch = pathname.match(/\/vendor\/event\/([^/]+)/);
     if (userRole === "admin") idMatch = pathname.match(/\/prueba\/vender\/([^/]+)/)
    if (idMatch && idMatch[1]) {
      setEventId(idMatch[1])
    }
  }, [])

  useEffect(() => {
    if (eventId) {
      fetchEventDetails()
    }
    
  }, [eventId])

  const fetchEventDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/evento/${eventId}`)
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()

      if (result.success && result.data) {
        setEvent(result.data)
        
      } else {
        throw new Error("No se pudo obtener la información del evento")
      }
      
     
    } catch (err) {
      console.error("Error fetching event details:", err)
      setError(err.message || "Error al cargar los detalles del evento")
    } finally {
      setLoading(false)
    }
  }

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }

    return date.toLocaleDateString("es-ES", options).replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
  }

  if (!mounted || loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-t-2 border-[#c28b5b] rounded-full animate-spin"></div>
            <p>Cargando detalles del evento...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Error</h1>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => fetchEventDetails()}
            className="w-full py-3 bg-[#c28b5b] text-white rounded-md font-medium hover:bg-[#b37a4a] transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </main>
    )
  }

  if (!event) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
          <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
          <p className="mb-4">No se pudo encontrar la información del evento solicitado.</p>
          <button
            onClick={() => router.push("/vendor")}
            className="w-full py-3 bg-[#c28b5b] text-white rounded-md font-medium hover:bg-[#b37a4a] transition-colors"
          >
            Volver
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
      <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
        <div className="mb-4 relative rounded-lg overflow-hidden shadow-md">
          {imageError ? (
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
              <div className="flex flex-col items-center text-gray-400">
                <ImageOff className="w-12 h-12 mb-2" />
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-48 bg-gray-800">
              <img
                src={event.image || "No hay imagen disponible"}
                alt={event.nombre}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-1">{event.nombre}</h1>
        <p className="text-sm text-gray-400 mb-1">Salón: {event.salonNombre}</p>
        <p className="text-sm text-gray-400 mb-1">Fecha: {formatDate(event.fecha)}</p>
        <p className="text-sm text-gray-400 mb-4">
          Duración: {event.duracion} minutos • Capacidad: {event.capacidad} personas
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-[#262b3a] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-sm text-gray-300">{event.descripcion}</p>
          </div>
        </div>

        <button
          onClick={() => { 
            if(userRole){
            const path = userRole === "admin" ? `/prueba/vender/${eventId}/buy` : `/vendor/event/${eventId}/buy`
                      router.push(path) }
          }}
          className="w-full py-3 bg-[#c28b5b] text-white rounded-md font-medium hover:bg-[#b37a4a] transition-colors"
        >
          Vender entrada
        </button>
      </div>
    </main>
  )
}

