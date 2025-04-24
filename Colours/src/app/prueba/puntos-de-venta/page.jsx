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
import PuntoModal from "../components/punto-modal"
import EditarModal from "../components/editar-modal"
import EdicionCompleta from "../components/edicion-completa"
import Header from "../components/header"
import Swal from "sweetalert2"
import apiUrls from "@/app/components/utils/apiConfig"

const API_URL = apiUrls.production

export default function PuntosDeVenta() {
  const [showModal, setShowModal] = useState(false)
  const [puntos, setPuntos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [verInactivos, setVerInactivos] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [puntoAEditar, setPuntoAEditar] = useState(null)
  const [showEdicionCompleta, setShowEdicionCompleta] = useState(false)
  const [selectedPunto, setSelectedPunto] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedPunto, setExpandedPunto] = useState(null)

  const itemsPerPage = 10

  useEffect(() => {
    const fetchPuntos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/puntodeventa`)
        if (!response.ok) throw new Error("Error al obtener los puntos de venta")
        const data = await response.json()
        if (data.success) {
          setPuntos(data.data)
        } else {
          throw new Error(data.message || "Error en los datos recibidos")
        }
      } catch (err) {
        setError(err.message)
        console.error("Error fetching puntos de venta:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPuntos()
  }, [])

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const filteredPuntos = puntos.filter((p) => {
    const searchText = removeAccents(searchTerm.toLowerCase())
    const matchSearch =
      removeAccents(p.nombre.toLowerCase()).includes(searchText) ||
      removeAccents(p.razon.toLowerCase()).includes(searchText) ||
      removeAccents(p.direccion.toLowerCase()).includes(searchText) ||
      removeAccents(p.email.toLowerCase()).includes(searchText) ||
      p.cuit.toString().includes(searchTerm) ||
      p.telefono.toString().includes(searchTerm)

    const matchActivo = verInactivos ? !p.isActive : p.isActive

    return matchSearch && matchActivo
  })

  const handleAddPunto = async (newPunto) => {
    try {
      // First check if a punto with this name already exists
      const checkResponse = await fetch(`${API_URL}/api/puntodeventa`)
      const existingPuntos = await checkResponse.json()

      if (existingPuntos.success && existingPuntos.data.some((p) => p.nombre === newPunto.nombre)) {
        throw new Error("Ya existe un punto de venta con este nombre")
      }

      // Continue with creation if name is unique
      const response = await fetch(`${API_URL}/api/puntodeventa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPunto),
      })

      if (!response.ok) throw new Error("Error al crear el punto de venta")

      await refreshPuntos()
      setShowModal(false)

      Swal.fire({
        icon: "success",
        title: "Punto creado",
        text: "El punto de venta fue creado correctamente",
      })
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        icon: "error",
        title: "Error al crear punto",
        text: error.message || "Hubo un error al crear el punto de venta",
      })
    }
  }

  const refreshPuntos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/puntodeventa`)
      const data = await res.json()
      if (data.success) {
        setPuntos(data.data)
      }
    } catch (error) {
      console.error("Error refreshing puntos:", error)
    }
  }

  const handleUpdatePunto = async () => {
    await refreshPuntos()
  }

  const handleDeletePunto = async (id) => {
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
        const response = await fetch(`${API_URL}/api/puntodeventa/delete/${id}`, { method: "DELETE" })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Error al eliminar el punto de venta")
        }

        Swal.fire("Eliminado", data.message, "success")
        await refreshPuntos()
      } catch (error) {
        Swal.fire("Error", error.message, "error")
      }
    }
  }

  const handleTogglePuntoStatus = async (id, isCurrentlyActive) => {
    const newStatus = !isCurrentlyActive
    const actionText = newStatus ? "activar" : "desactivar"

    const confirmResult = await Swal.fire({
      title: `¿${newStatus ? "Activar" : "Desactivar"} punto de venta?`,
      text: `Estás a punto de ${actionText} este punto de venta.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    })

    if (!confirmResult.isConfirmed) return

    try {
      const response = await fetch(`${API_URL}/api/puntodeventa/soft-delete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Error al ${actionText} el punto`)
      }

      setPuntos((prevPuntos) =>
        prevPuntos.map((punto) => (punto.id === id ? { ...punto, isActive: newStatus } : punto)),
      )

      await Swal.fire({
        title: `Punto ${newStatus ? "activado" : "desactivado"}`,
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

  const totalPages = Math.ceil(filteredPuntos.length / itemsPerPage)
  const currentItems = filteredPuntos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Puntos de Venta" />
        <div className="flex justify-center items-center h-64">
          <p>Cargando puntos de venta...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Header title="Puntos de Venta" />
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <Header title="Puntos de Venta" />

      {/* Filtros y búsqueda */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="    Buscar por nombre, razón social, dirección, email, CUIT o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <button
            className={`btn ${verInactivos ? "btn-warning" : "btn-outline"} flex items-center gap-2 w-full md:w-auto`}
            onClick={() => setVerInactivos((prev) => !prev)}
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
            Agregar punto
          </button>
        </div>
      </div>

      {/* Tabla de puntos de venta */}
      <div className="overflow-x-auto">
        {/* Vista de escritorio */}
        <div className="hidden md:block">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Razón Social</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>CUIT</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th className="w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((punto) => (
                <tr
                  key={punto.id}
                  className={`cursor-pointer ${!punto.isActive ? "opacity-70 bg-gray-50" : ""}`}
                  onClick={() => {
                    setSelectedPunto(punto)
                    setShowEdicionCompleta(true)
                  }}
                >
                  <td>{punto.razon}</td>
                  <td>{punto.nombre}</td>
                  <td>{punto.direccion}</td>
                  <td>{punto.cuit}</td>
                  <td>{punto.email}</td>
                  <td>{punto.telefono}</td>
                  <td>{punto.es_online ? "Online" : "Físico"}</td>
                  <td>
                    <span className={`badge ${punto.isActive ? "badge-success" : "badge-error"}`}>
                      {punto.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPuntoAEditar(punto)
                        }}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        className={`btn btn-sm btn-outline ${punto.isActive ? "btn-warning" : "btn-success"} p-1`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTogglePuntoStatus(punto.id, punto.isActive)
                        }}
                        title={punto.isActive ? "Desactivar" : "Activar"}
                      >
                        {punto.isActive ? <Archive className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                      </button>

                      <button
                        className="btn btn-sm btn-outline btn-error p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePunto(punto.id)
                        }}
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista móvil mejorada */}
        <div className="md:hidden space-y-4">
          {currentItems.map((punto) => (
            <div key={punto.id} className={`border rounded-lg p-4 ${!punto.isActive ? "opacity-70 bg-gray-50" : ""}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium">{punto.nombre}</div>
                  <div className="text-sm text-gray-500 truncate">{punto.razon}</div>
                </div>
                <button
                  onClick={() => setExpandedPunto(expandedPunto === punto.id ? null : punto.id)}
                  className="text-gray-500 flex items-center gap-1 ml-2"
                >
                  {expandedPunto === punto.id ? (
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

              {expandedPunto === punto.id && (
                <div className="mt-4 space-y-3 overflow-x-hidden">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Razón Social:</span>
                      <span className="break-words">{punto.razon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Dirección:</span>
                      <span className="break-words">{punto.direccion}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">CUIT:</span>
                      <span>{punto.cuit}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Email:</span>
                      <span className="break-words">{punto.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Teléfono:</span>
                      <span>{punto.telefono}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Tipo:</span>
                      <span>{punto.es_online ? "Online" : "Físico"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Estado:</span>
                      <span
                        className={`badge ${punto.isActive ? "badge-success" : "badge-error"} inline-block w-fit mt-1`}
                      >
                        {punto.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3 mt-2 border-t">
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <button
                        className="btn btn-sm btn-outline btn-primary flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPuntoAEditar(punto)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="text-xs">Editar</span>
                      </button>
                      <button
                        className={`btn btn-sm btn-outline ${
                          punto.isActive ? "btn-warning" : "btn-success"
                        } flex items-center justify-center`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTogglePuntoStatus(punto.id, punto.isActive)
                        }}
                      >
                        {punto.isActive ? (
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
                          handleDeletePunto(punto.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Eliminar</span>
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-sm btn-outline w-full mt-2"
                    onClick={() => {
                      setSelectedPunto(punto)
                      setShowEdicionCompleta(true)
                    }}
                  >
                    Ver detalles completos
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredPuntos.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No se encontraron puntos de venta que coincidan con los criterios de búsqueda</p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination mt-6 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button className="btn btn-sm btn-outline" onClick={() => setCurrentPage((prev) => prev + 1)}>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Modales */}
      {showModal && <PuntoModal onClose={() => setShowModal(false)} onSubmit={handleAddPunto} />}

      {puntoAEditar && (
        <EditarModal punto={puntoAEditar} onClose={() => setPuntoAEditar(null)} onUpdate={handleUpdatePunto} />
      )}

      {showEdicionCompleta && selectedPunto && (
        <EdicionCompleta
          punto={selectedPunto}
          onClose={() => {
            setShowEdicionCompleta(false)
            setSelectedPunto(null)
          }}
          onUpdate={() => {
            refreshPuntos()
            setShowEdicionCompleta(false)
            setSelectedPunto(null)
          }}
        />
      )}
    </div>
  )
}
