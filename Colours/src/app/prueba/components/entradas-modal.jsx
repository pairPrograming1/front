"use client"

import { useState } from "react"
import { X, AlertCircle, DollarSign, Tag, Check } from "lucide-react"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"

const API_URL = apiUrls

export default function EntradasModal({ evento, onClose }) {
  const [formData, setFormData] = useState({
    tipo_entrada: "",
    precio: "",
    estatus: "disponible",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones
    if (!formData.tipo_entrada.trim()) {
      setError("El tipo de entrada es obligatorio")
      return
    }

    if (!formData.precio || isNaN(formData.precio) || Number.parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser un número mayor que cero")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const entradaData = {
        tipo_entrada: formData.tipo_entrada,
        eventoId: evento.id,
        precio: Number.parseFloat(formData.precio),
        cantidad: evento.capacidad, // Usar automáticamente la capacidad del evento
        estatus: formData.estatus,
      }

      const response = await fetch(`${API_URL}/api/entrada/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entradaData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al crear la entrada")
      }

      const result = await response.json()

      Swal.fire({
        title: "¡Entradas Creadas!",
        text: `Se han creado ${evento.capacidad} entradas de tipo "${formData.tipo_entrada}" correctamente`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ca8a04", // Yellow-600
        timer: 3000,
        timerProgressBar: true,
      })

      onClose()
    } catch (err) {
      console.error("Error al crear entrada:", err)
      setError(err.message || "No se pudo crear la entrada")

      Swal.fire({
        title: "Error",
        text: err.message || "No se pudieron crear las entradas. Intente nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#b91c1c", // Red-700
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border-2 border-yellow-600 p-4 sm:p-6 w-full max-w-2xl mx-auto shadow-lg shadow-yellow-800/20 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Agregar Entradas</h2>
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 bg-gray-700/50 border border-yellow-600 rounded-lg p-3">
          <h3 className="text-yellow-500 font-medium">Detalles del Evento</h3>
          <p className="text-white mt-1">{evento.nombre}</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-300">
            <div>
              Capacidad: <span className="text-yellow-400">{evento.capacidad || "Sin límite"}</span>
            </div>
            <div>
              Salón: <span className="text-yellow-400">{evento.salon || "Sin asignar"}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white">Tipo de Entrada</label>
            <div className="relative">
              <input
                type="text"
                name="tipo_entrada"
                value={formData.tipo_entrada}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                placeholder="Ej: General, VIP, Estudiante"
                required
              />
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white">Precio</label>
            <div className="relative">
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-white">Estatus</label>
            <div className="relative">
              <select
                name="estatus"
                value={formData.estatus}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-yellow-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors appearance-none"
              >
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
                <option value="reservado">Reservado</option>
              </select>
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-5 w-5" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-yellow-200 text-sm mb-4">
              <p>
                Se crearán <strong>{evento.capacidad}</strong> entradas de tipo{" "}
                <strong>{formData.tipo_entrada || "[Tipo de entrada]"}</strong> para este evento.
              </p>
              <p className="mt-1">La cantidad se establece automáticamente según la capacidad del evento.</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-2 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                "Creando..."
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span>Crear Entradas</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
