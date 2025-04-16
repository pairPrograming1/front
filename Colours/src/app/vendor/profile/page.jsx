"use client"

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    whatsapp: "",
  })

  useEffect(() => {
    setMounted(true)
    // Aquí podrías cargar los datos del perfil del usuario desde una API
    setFormData({
      fullName: "Juan Pérez",
      address: "Av. Siempreviva 742",
      email: "juan.perez@example.com",
      whatsapp: "+54 9 11 1234-5678",
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos actualizados
    console.log("Datos actualizados:", formData)
    alert("Perfil actualizado correctamente")
  }

  // Renderizamos un esqueleto básico durante la hidratación
  if (!mounted) {
    return (
      <div className="flex min-h-full w-full flex-col items-center p-4">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 w-32 bg-gray-700 mb-6 rounded"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded mt-6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Encabezado con título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        </div>

        {/* Formulario de perfil */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nombre y Apellido"
              className="w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none"
              style={{
                backgroundColor: "transparent",
                borderColor: "#BF8D6B",
              }}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none"
              style={{
                backgroundColor: "transparent",
                borderColor: "#BF8D6B",
              }}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none"
              style={{
                backgroundColor: "transparent",
                borderColor: "#BF8D6B",
              }}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
              className="w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none"
              style={{
                backgroundColor: "transparent",
                borderColor: "#BF8D6B",
              }}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md py-3 font-medium text-white"
              style={{ backgroundColor: "#BF8D6B" }}
            >
              Actualizar Perfil
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button className="text-sm text-gray-300 hover:text-white">Cambiar Contraseña</button>
        </div>
      </div>
    </div>
  )
}
