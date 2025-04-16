"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function EventDetailPage({ params }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [eventId, setEventId] = useState(null)

  useEffect(() => {
    // Acceder a params de manera segura dentro de useEffect
    if (params) {
      // Convertir a string para asegurar compatibilidad
      setEventId(String(params.id || "1"))
    }
    setMounted(true)
  }, [params])

  if (!mounted) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
          <p>Cargando...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
      <div className="w-full max-w-md bg-[#1E2330]/80 p-6 rounded-xl shadow-lg text-white">
        <div className="mb-4 relative rounded-lg overflow-hidden">
          <img
            src="/event-performance.jpg"
            alt="Event performance"
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </div>

        <h1 className="text-2xl font-bold mb-1">Colegio del Sol</h1>
        <p className="text-sm text-gray-400 mb-1">Artes Escénicas</p>
        <p className="text-sm text-gray-400 mb-4">Sábado 26 de Diciembre a las 20hs</p>

        <div className="space-y-4 mb-6">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et amet ut consectetur. Curabitur vitae
            diam nulla. Cras mattis tellus et dui rhoncus, quis pretium a turpis viverra.
          </p>

          <p className="text-sm">
            Sed sed diam an facilisis, quis eleifend sapien. Donec commodo a urna id rhoncus commodo ut urna. Ut vitae
            nibh sed est sit amet nibh. Duis commodo mauris molestie accumsan mattis.
          </p>
        </div>

        <button
          onClick={() => {
            if (eventId) {
              router.push(`/vendor/event/${eventId}/buy`)
            }
          }}
          className="w-full py-3 bg-[#c28b5b] text-white rounded-md font-medium hover:bg-[#b37a4a] transition-colors"
        >
          Vender entrada
        </button>
      </div>
    </main>
  )
}
