"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Power,
  Archive,
  Edit,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import SalonModal from "../components/salon-modal"
import SalonEditarModal from "../components/salon-editar-modal"
import Header from "../components/header"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"

const API_URL = apiUrls.production

export default function Salones() {
  const [showModal, setShowModal] = useState(false)
  const [salones, setSalones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [verInactivos, setVerInactivos] = useState(false)
  const [salonAEditar, setSalonAEditar] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSalon, setExpandedSalon] = useState(null)

  const itemsPerPage = 10

  const removeAccents = (str) => {
    return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || ""
  }

  const fetchSalones = async (pageNum = 1, limitNum = 10, search = "", includeInactive = false) => {
    try {
      setLoading(true)

      // Construir URL con parámetros de consulta
      let url = `${API_URL}/api/salon?page=${pageNum}&limit=${limitNum}`

      // Añadir término de búsqueda si existe
      if (search) {
        url += `&search=${encodeURIComponent(search)}`
      }

      // Añadir parámetro para incluir eliminados según el estado de verInactivos
      if (includeInactive) {
        url += "&includeDeleted=true"
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      // Verificar si la respuesta incluye información de paginación
      if (data.pagination) {
        // Actualizar el estado con la información de paginación
        setTotalPages(data.pagination.totalPages)
        setCurrentPage(data.pagination.page)

        // Guardar los salones desde data.data
        setSalones(Array.isArray(data.data) ? data.data : [])
      } else {
        // Manejar respuestas antiguas o sin paginación
        const salonesData = Array.isArray(data) ? data : data.data ? data.data : data.salones ? data.salones : [data]

        setSalones(salonesData)

        // Calcular paginación manual si la API no la proporciona
        setTotalPages(Math.ceil(salonesData.length / limitNum))
      }
    } catch (err) {
      setError(err.message)
      setSalones([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSalones(currentPage, itemsPerPage, searchTerm, verInactivos)
  }, [verInactivos])

  const refreshSalones = async () => {
    await fetchSalones(currentPage, itemsPerPage, searchTerm, verInactivos)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    fetchSalones(newPage, itemsPerPage, searchTerm, verInactivos)
  }

  const handleAddSalon = async (newSalon) => {
    try {
      const response = await fetch(`${API_URL}/api/salon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSalon),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      await refreshSalones()
      setShowModal(false)

      Swal.fire({
        icon: "success",
        title: "Salón creado",
        text: "El salón fue creado correctamente",
      })
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        icon: "error",
        title: "Error al crear salón",
        text: error.message || "Hubo un error al crear el salón",
      })
    }
  }

  const handleUpdateSalon = async (updated) => {
    if (updated) {
      await refreshSalones()
      Swal.fire({
        icon: "success",
        title: "Salón actualizado",
        text: "El salón fue actualizado correctamente",
        timer: 2000,
        showConfirmButton: false,
      })
    }
    setSalonAEditar(null)
  }

  const handleDeleteSalon = async (id) => {
    const confirmResult = await Swal.fire({
      title: "¿Eliminar permanentemente?",
      text: "Esta acción no se puede deshacer. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/api/salon/physical/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Error ${response.status}: ${errorText}`)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || "Error al eliminar el salón")
        }

        Swal.fire("Eliminado", data.message, "success")
        await refreshSalones()
      } catch (error) {
        console.error("Error al eliminar:", error)
        Swal.fire("Error", error.message, "error")
      }
    }
  }

  const handleToggleSalonStatus = async (id, isCurrentlyActive) => {
    const newStatus = !isCurrentlyActive
    const actionText = newStatus ? "activar" : "desactivar"

    const confirmResult = await Swal.fire({
      title: `¿${newStatus ? "Activar" : "Desactivar"} salón?`,
      text: `Estás a punto de ${actionText} este salón.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    })

    if (!confirmResult.isConfirmed) return

    try {
      const response = await fetch(`${API_URL}/api/salon/toggle-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || `Error al ${actionText} el salón`)
      }

      // Actualizar la lista en lugar de solo actualizar el estado local
      await refreshSalones()

      await Swal.fire({
        title: `Salón ${newStatus ? "activado" : "desactivado"}`,
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("Error al cambiar estado:", error)
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      })
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
    // Debounce para buscar después de que el usuario deje de escribir
    const searchValue = e.target.value
    const handler = setTimeout(() => {
      fetchSalones(1, itemsPerPage, searchValue, verInactivos)
    }, 300)
    return () => clearTimeout(handler)
  }

  const toggleVerInactivos = () => {
    setVerInactivos((prev) => !prev)
    setCurrentPage(1) // Resetear a la primera página al cambiar el filtro
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Salones" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando salones...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Salones" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <Header title="Salones" />

      {/* Filtros y búsqueda */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar salones..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <button
            className={`btn ${verInactivos ? "btn-warning" : "btn-outline"} flex items-center gap-2 w-full md:w-auto`}
            onClick={toggleVerInactivos}
          >
            {verInactivos ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {verInactivos ? "Ver activos" : "Ver inactivos"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="btn btn-primary flex items-center gap-2 w-full md:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar salón
          </button>
        </div>
      </div>

      {/* Tabla de salones */}
      <div className="overflow-x-auto">
        {/* Vista de escritorio */}
        <div className="hidden md:block">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Salón</th>
                <th>CUIT</th>
                <th>Nombre del Contacto</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th className="w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salones.length > 0 ? (
                salones.map((salon) => {
                  const isActive = salon.isActive ?? salon.estatus ?? true

                  return (
                    <tr
                      key={salon.id || salon._id || salon.Id}
                      className={`cursor-pointer ${!isActive ? "opacity-70 bg-gray-50" : ""}`}
                    >
                      <td>{salon.salon || salon.nombre}</td>
                      <td>{salon.cuit}</td>
                      <td>{salon.contacto || salon.nombre}</td>
                      <td>{salon.email}</td>
                      <td>{salon.whatsapp}</td>
                      <td>{salon.capacidad || "N/A"}</td>
                      <td>
                        <span className={`badge ${isActive ? "badge-success" : "badge-error"}`}>
                          {isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-outline btn-primary p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSalonAEditar(salon)
                            }}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            className={`btn btn-sm btn-outline ${isActive ? "btn-warning" : "btn-success"} p-1`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleSalonStatus(salon.id || salon._id || salon.Id, isActive)
                            }}
                            title={isActive ? "Desactivar" : "Activar"}
                          >
                            {isActive ? <Archive className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                          </button>

                          <button
                            className="btn btn-sm btn-outline btn-error p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteSalon(salon.id || salon._id || salon.Id)
                            }}
                            title="Eliminar permanentemente"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <p className="text-gray-500">
                      No se encontraron salones que coincidan con los criterios de búsqueda
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista móvil mejorada */}
        <div className="md:hidden space-y-4">
          {salones.length > 0 ? (
            salones.map((salon) => {
              const isActive = salon.isActive ?? salon.estatus ?? true
              const salonId = salon.id || salon._id || salon.Id

              return (
                <div
                  key={salonId}
                  className={`border rounded-lg overflow-hidden ${!isActive ? "opacity-70 bg-gray-50" : ""}`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{salon.salon || salon.nombre}</div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"}`}
                          ></span>
                          <span>{isActive ? "Activo" : "Inactivo"}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedSalon(expandedSalon === salonId ? null : salonId)}
                        className="text-gray-500 flex items-center gap-1 ml-2"
                      >
                        {expandedSalon === salonId ? (
                          <>
                            <span className="text-xs">Cerrar</span>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span className="text-xs">Detalles</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Información básica siempre visible */}
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="truncate">
                        <span className="font-medium">Contacto:</span> {salon.contacto || "No especificado"}
                      </div>
                    </div>

                    {expandedSalon === salonId && (
                      <div className="mt-4 space-y-3 overflow-x-hidden">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">CUIT:</span>
                            <span className="break-words">{salon.cuit || "No especificado"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Email:</span>
                            <span className="break-words">{salon.email || "No especificado"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">WhatsApp:</span>
                            <span>{salon.whatsapp || "No especificado"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Capacidad:</span>
                            <span>{salon.capacidad || "No especificado"}</span>
                          </div>
                        </div>

                        <div className="flex justify-between pt-3 mt-2 border-t">
                          <div className="grid grid-cols-3 gap-2 w-full">
                            <button
                              className="btn btn-sm btn-outline btn-primary flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSalonAEditar(salon)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              <span className="text-xs">Editar</span>
                            </button>
                            <button
                              className={`btn btn-sm btn-outline ${
                                isActive ? "btn-warning" : "btn-success"
                              } flex items-center justify-center`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleSalonStatus(salonId, isActive)
                              }}
                            >
                              {isActive ? (
                                <>
                                  <Archive className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Desactivar</span>
                                </>
                              ) : (
                                <>
                                  <Power className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Activar</span>
                                </>
                              )}
                            </button>
                            <button
                              className="btn btn-sm btn-outline btn-error flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteSalon(salonId)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span className="text-xs">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-gray-500">No se encontraron salones que coincidan con los criterios de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination mt-6 flex flex-wrap justify-center gap-2">
          {currentPage > 1 && (
            <button className="btn btn-sm btn-outline" onClick={() => handlePageChange(currentPage - 1)}>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          )}
          {[...Array(totalPages)].map((_, index) => {
            // Show limited page numbers on mobile
            if (index === 0 || index === totalPages - 1 || (index >= currentPage - 2 && index <= currentPage + 0)) {
              return (
                <button
                  key={index}
                  className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            } else if (
              (index === currentPage - 3 && currentPage > 3) ||
              (index === currentPage + 1 && currentPage < totalPages - 2)
            ) {
              return (
                <span key={index} className="flex items-center justify-center px-2">
                  ...
                </span>
              )
            }
            return null
          })}
          {currentPage < totalPages && (
            <button className="btn btn-sm btn-outline" onClick={() => handlePageChange(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Modales */}
      {showModal && (
        <SalonModal onClose={() => setShowModal(false)} onAddSalon={handleAddSalon} API_URL={`${API_URL}/api/salon`} />
      )}

      {salonAEditar && (
        <SalonEditarModal salon={salonAEditar} onClose={handleUpdateSalon} API_URL={`${API_URL}/api/salon`} />
      )}
    </div>
  )
}
