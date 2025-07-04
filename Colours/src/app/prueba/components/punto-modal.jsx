"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"

const API_URL = apiUrls

export default function PuntoModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    razon: "",
    nombre: "",
    direccion: "",
    telefono: "",
    cuit: "",
    email: "",
    es_online: false,
  })

  const [error, setError] = useState(null)
  const [cuitFormatted, setCuitFormatted] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(false)

  useEffect(() => {
    setLoadingUsuarios(true)
    fetch(`${API_URL}/api/users/usuarios?`)
      .then((res) => res.json())
      .then((data) => {
        const soloVendors = Array.isArray(data) ? data.filter((usuario) => usuario.rol === "vendor") : []
        setUsuarios(soloVendors)
      })
      .catch(() => setUsuarios([]))
      .finally(() => setLoadingUsuarios(false))
  }, [])

  const handleBlur = (e) => {
    const { name, value } = e.target
    if (name === "telefono") {
      const numericValue = value.replace(/\D/g, "")
      if (numericValue.length > 0 && (numericValue.length < 9 || numericValue.length > 14)) {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "El teléfono debe tener entre 9 y 14 dígitos.",
        })
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "telefono") {
      const validatedValue = value.replace(/[^0-9+]/g, "")
      if (validatedValue.includes("+")) {
        const parts = validatedValue.split("+")
        if (parts.length > 2 || (parts.length === 2 && parts[0] !== "")) {
          return
        }
      }
      setFormData((prev) => ({ ...prev, [name]: validatedValue }))
      return
    }

    if (name === "cuit") {
      const digits = value.replace(/[^\d-]/g, "")
      const digitCount = digits.replace(/-/g, "").length
      if (digitCount > 11) return

      setFormData((prev) => ({ ...prev, [name]: digits }))

      const cleanDigits = digits.replace(/-/g, "")
      if (cleanDigits.length >= 2 && cleanDigits.length <= 10) {
        setCuitFormatted(`${cleanDigits.substring(0, 2)}-${cleanDigits.substring(2)}`)
      } else if (cleanDigits.length === 11) {
        setCuitFormatted(`${cleanDigits.substring(0, 2)}-${cleanDigits.substring(2, 10)}-${cleanDigits.substring(10)}`)
      } else {
        setCuitFormatted(cleanDigits)
      }
      return
    }

    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateCUIT = (cuit) => {
    const digits = cuit.replace(/-/g, "")
    if (digits.length !== 11) return false
    const cuitPattern = /^\d{2}-?\d{8}-?\d{1}$/
    return cuitPattern.test(cuit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.razon.trim()) {
      setError("La razón social es requerida")
      return
    }

    if (!formData.nombre.trim()) {
      setError("El nombre es requerido")
      return
    }

    if (!formData.direccion.trim()) {
      setError("La dirección es requerida")
      return
    }

    if (!formData.telefono.trim()) {
      setError("El teléfono es requerido")
      return
    }

    if (!/^\+?\d+$/.test(formData.telefono)) {
      setError("El teléfono solo puede contener números y un + al inicio")
      return
    }

    if (!formData.cuit.trim()) {
      setError("El CUIT es requerido")
      return
    }

    const cleanCUIT = formData.cuit.replace(/-/g, "")
    if (cleanCUIT.length !== 11) {
      setError("El CUIT debe tener exactamente 11 dígitos")
      return
    }

    if (!validateCUIT(formData.cuit)) {
      setError("El formato del CUIT es inválido (debe ser XX-XXXXXXXX-X)")
      return
    }

    if (!formData.email.trim()) {
      setError("El email es requerido")
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      setError("El formato del correo electrónico es inválido")
      return
    }

    const formattedCUIT = cleanCUIT.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3")

    const puntoCreado = await onSubmit({
      ...formData,
      cuit: formattedCUIT,
    })

    if (selectedUser && puntoCreado && puntoCreado.id) {
      try {
        await fetch(`${API_URL}/api/puntodeventa/addvendedor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: selectedUser,
            puntoId: puntoCreado.id,
          }),
        })
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo asociar el vendedor al punto.",
        })
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-2xl border-2 border-yellow-600">
          
          <div className="sticky top-0 z-10 bg-gray-800 border-b border-yellow-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Agregar Punto</h2>
            <button onClick={onClose} className="text-yellow-500 hover:text-yellow-300 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido con scroll */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <label className="block text-sm text-yellow-400 mb-1">Razón Social</label>
                <input
                  type="text"
                  name="razon"
                  value={formData.razon}
                  onChange={handleChange}
                  placeholder="Razón Social *"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre *"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">Teléfono</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Teléfono (solo números, + opcional) *"
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                        required
                      />
                      {formData.telefono && (
                        <span className="absolute right-3 top-3 text-gray-400 text-xs">
                          {formData.telefono.replace(/(\+\d{2})(\d{4})(\d{4})/, "$1 $2 $3")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail *"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Dirección *"
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-yellow-400 mb-1">CUIT</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cuit"
                        value={formData.cuit}
                        onChange={handleChange}
                        placeholder="CUIT (11 dígitos) sin guiones*"
                        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                        maxLength={13}
                        required
                      />
                      {formData.cuit.replace(/-/g, "").length === 11 && (
                        <span className="absolute right-3 top-3 text-green-400 text-sm">{cuitFormatted}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      name="es_online"
                      checked={formData.es_online}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-yellow-600 bg-gray-700 border-yellow-600 rounded focus:ring-yellow-500"
                      id="es_online"
                    />
                    <label htmlFor="es_online" className="text-white">
                      Punto Online
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-yellow-400 mb-1">Ver usuarios</label>
                <select
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-yellow-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled={loadingUsuarios}
                >
                  <option value="">{loadingUsuarios ? "Cargando usuarios..." : "Selecciona un usuario"}</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          {/* Footer fijo */}
          <div className="sticky bottom-0 bg-gray-800 px-6 py-4 border-t border-yellow-600">
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg border border-yellow-600 transition-colors duration-300"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
