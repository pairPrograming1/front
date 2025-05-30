"use client"

import { useState, useEffect } from "react"
import { Search, Download, Eye, FileText } from "lucide-react"
import Header from "../components/header"
import OrdenDetalleModal from "@/app/components/entradas/ordenDetalleModal"
import apiUrls from "@/app/components/utils/apiConfig"
import ReportePDFModal from "@/app/components/entradas/reporteModalDetalle"

const API_URL = apiUrls

export default function OrdenesYPagos() {
  const [ordenes, setOrdenes] = useState([])
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrden, setSelectedOrden] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrdenes, setTotalOrdenes] = useState(0)
  const limit = 7

  // Filtros
  const [filters, setFilters] = useState({
    evento: "",
    fechaDesde: "",
    fechaHasta: "",
    estado: "",
  })

  // Fetch órdenes
  const fetchOrdenes = async (page = 1) => {
    try {
      setLoading(true)
      const offset = (page - 1) * limit
      const response = await fetch(`${API_URL}/api/order/?limit=${limit}&offset=${offset}`)
      const data = await response.json()

      if (data.success) {
        setOrdenes(data.data.ordenes || [])
        setTotalOrdenes(data.data.pagination?.total || 0)
        setTotalPages(Math.ceil((data.data.pagination?.total || 0) / limit))
      } else {
        setError("Error al cargar las órdenes")
      }
    } catch (err) {
      setError("Error de conexión al cargar órdenes")
      console.error("Error fetching orders:", err)
    }
  }

  // Fetch pagos
  const fetchPagos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/payment/pago/?limit=1000&offset=0`)
      const data = await response.json()

      if (data.success) {
        setPagos(data.data.pagos || [])
      }
    } catch (err) {
      console.error("Error fetching payments:", err)
    } finally {
      setLoading(false)
    }
  }

  // Combinar órdenes con sus pagos
  const getOrdenConPago = (orden) => {
    const pago = pagos.find((p) => p.ordenId === orden.id)
    return { ...orden, pago }
  }

  // Obtener nombre del evento desde los detalles
  const getEventoNombre = (orden) => {
    if (orden.DetalleDeOrdens && orden.DetalleDeOrdens.length > 0) {
      return orden.DetalleDeOrdens[0]?.Entrada?.Evento?.nombre || "Sin evento"
    }
    return "Sin evento"
  }

  // Formatear fecha
  const formatFecha = (fecha) => {
    if (!fecha) return "Sin fecha"
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Formatear monto
  const formatMonto = (monto) => {
    return `$${Number.parseFloat(monto || 0).toLocaleString()}`
  }

  // Obtener badge de estado
  const getEstadoBadge = (estado, pago) => {
    if (pago) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/50 text-green-300 border border-green-700">
          Pagado
        </span>
      )
    }

    switch (estado) {
      case "pendiente":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-orange-900/50 text-orange-300 border border-orange-700">
            Pendiente
          </span>
        )
      case "cancelado":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-900/50 text-red-300 border border-red-700">
            Cancelado
          </span>
        )
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-900/50 text-blue-300 border border-blue-700">
            {estado}
          </span>
        )
    }
  }

  // Manejar clic en fila
  const handleRowClick = (orden) => {
    const ordenConPago = getOrdenConPago(orden)
    setSelectedOrden(ordenConPago)
    setShowModal(true)
  }

  // Cambiar página
  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchOrdenes(page)
  }

  // Calcular totales
  const calcularTotales = () => {
    const ordenesConPago = ordenes.map(getOrdenConPago)
    const totalEntradas = ordenesConPago.reduce((sum, orden) => sum + Number.parseFloat(orden.total || 0), 0)
    const totalPagado = ordenesConPago
      .filter((orden) => orden.pago)
      .reduce((sum, orden) => sum + Number.parseFloat(orden.pago.total || 0), 0)

    return { totalEntradas, totalPagado }
  }

  // Descargar CSV con resumen y detalles
  const downloadCSV = () => {
    try {
      const ordenesConPago = ordenes.map(getOrdenConPago)
      const { totalEntradas, totalPagado } = calcularTotales()
      const totalPendiente = totalEntradas - totalPagado

      // Crear contenido CSV
      let csvContent = ""

      // Encabezado del resumen
      csvContent += "RESUMEN GENERAL\n"
      csvContent += "Concepto,Monto\n"
      csvContent += `Total Órdenes,$${totalEntradas.toLocaleString()}\n`
      csvContent += `Total Pagado,$${totalPagado.toLocaleString()}\n`
      csvContent += `Total Pendiente,$${totalPendiente.toLocaleString()}\n`
      csvContent += `Cantidad de Órdenes,${totalOrdenes}\n`
      csvContent += `Cantidad de Pagos,${pagos.length}\n`
      csvContent += `Fecha de Reporte,${new Date().toLocaleDateString("es-ES")}\n`
      csvContent += "\n\n"

      // Encabezado de detalles
      csvContent += "DETALLE DE ÓRDENES\n"
      csvContent +=
        "ID Orden,Cliente,DNI,Email,Teléfono,Evento,Fecha Creación,Fecha Pago,Monto Orden,Estado,Referencia Pago,Monto Pagado\n"

      // Datos de las órdenes
      ordenesConPago.forEach((orden) => {
        const evento = getEventoNombre(orden)
        const fechaCreacion = formatFecha(orden.fecha_creacion)
        const fechaPago = orden.pago ? formatFecha(orden.pago.fecha_pago) : "Sin pago"
        const estado = orden.pago ? "Pagado" : orden.estado
        const referenciaPago = orden.pago ? orden.pago.referencia : "N/A"
        const montoPagado = orden.pago ? orden.pago.total : 0

        // Escapar comillas en los datos
        const escapeCsv = (str) => {
          if (str === null || str === undefined) return ""
          return `"${String(str).replace(/"/g, '""')}"`
        }

        csvContent += `${escapeCsv(orden.id.slice(0, 8))},`
        csvContent += `${escapeCsv(orden.nombre_cliente)},`
        csvContent += `${escapeCsv(orden.dni_cliente)},`
        csvContent += `${escapeCsv(orden.email_cliente)},`
        csvContent += `${escapeCsv(orden.telefono_cliente)},`
        csvContent += `${escapeCsv(evento)},`
        csvContent += `${escapeCsv(fechaCreacion)},`
        csvContent += `${escapeCsv(fechaPago)},`
        csvContent += `$${Number.parseFloat(orden.total || 0).toLocaleString()},`
        csvContent += `${escapeCsv(estado)},`
        csvContent += `${escapeCsv(referenciaPago)},`
        csvContent += `$${Number.parseFloat(montoPagado || 0).toLocaleString()}\n`
      })

      // Crear y descargar archivo
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)

      link.setAttribute("href", url)
      link.setAttribute("download", `ordenes_y_pagos_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = "hidden"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error al generar CSV:", error)
      alert("Error al generar el archivo CSV")
    }
  }

  const { totalEntradas, totalPagado } = calcularTotales()

  useEffect(() => {
    fetchOrdenes(currentPage)
    fetchPagos()
  }, [currentPage])

  if (loading && ordenes.length === 0) {
    return (
      <div className="p-6">
        <Header title="Órdenes y Pagos" />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BF8D6B]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Header title="Órdenes y Pagos" />

      {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">{error}</div>}

      {/* Resumen Total */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total Órdenes</p>
          <p className="text-2xl font-bold text-white">{formatMonto(totalEntradas)}</p>
          <p className="text-sm text-gray-500">{totalOrdenes} órdenes</p>
        </div>
        <div className="bg-[#2A2F3D] border border-[#2A2F3D] rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-2">Total Pagado</p>
          <p className="text-2xl font-bold text-green-400">{formatMonto(totalPagado)}</p>
          <p className="text-sm text-gray-500">{pagos.length} pagos</p>
        </div>
        <div className="bg-[#2A2F3D] bg-opacity-20 border border-[#C88D6B] rounded-lg p-4 text-center">
          <p className="text-gray-200 mb-2">Pendiente</p>
          <p className="text-2xl font-bold text-[#C88D6B]">{formatMonto(totalEntradas - totalPagado)}</p>
          <p className="text-sm text-gray-300">Por cobrar</p>
        </div>
      </div>

      {/* Filtros de Búsqueda */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
        <div className="relative w-full sm:w-1/4">
          <input
            type="text"
            placeholder="Buscar por evento"
            value={filters.evento}
            onChange={(e) => setFilters({ ...filters, evento: e.target.value })}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <div className="w-full sm:w-1/5">
          <input
            type="date"
            value={filters.fechaDesde}
            onChange={(e) => setFilters({ ...filters, fechaDesde: e.target.value })}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          />
        </div>

        <div className="w-full sm:w-1/5">
          <input
            type="date"
            value={filters.fechaHasta}
            onChange={(e) => setFilters({ ...filters, fechaHasta: e.target.value })}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          />
        </div>

        <div className="w-full sm:w-1/5">
          <select
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            className="w-full bg-gray-700 border border-[#BF8D6B] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#BF8D6B] transition-colors"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-[#BF8D6B] hover:bg-[#A67A5B] text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Descargar CSV
          </button>
        </div>
      </div>

      {/* Tabla de Órdenes (Desktop) y Tarjetas (Mobile) */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {/* Vista Desktop - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-white font-medium">Orden</th>
                <th className="px-4 py-3 text-left text-white font-medium">Cliente</th>
                <th className="px-4 py-3 text-left text-white font-medium">Evento</th>
                <th className="px-4 py-3 text-left text-white font-medium">Fecha</th>
                <th className="px-4 py-3 text-left text-white font-medium">Monto</th>
                <th className="px-4 py-3 text-left text-white font-medium">Estado</th>
                <th className="px-4 py-3 text-center text-white font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {ordenes.map((orden) => {
                const ordenConPago = getOrdenConPago(orden)
                return (
                  <tr
                    key={orden.id}
                    className="hover:bg-gray-700/50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(orden)}
                  >
                    <td className="px-4 py-3 text-gray-300">
                      <div className="font-mono text-sm">#{orden.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      <div>
                        <div className="font-medium">{orden.nombre_cliente}</div>
                        <div className="text-sm text-gray-500">{orden.email_cliente}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{getEventoNombre(orden)}</td>
                    <td className="px-4 py-3 text-gray-300">{formatFecha(orden.fecha_creacion)}</td>
                    <td className="px-4 py-3 text-gray-300 font-medium">{formatMonto(orden.total)}</td>
                    <td className="px-4 py-3">{getEstadoBadge(orden.estado, ordenConPago.pago)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowClick(orden)
                        }}
                        className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Vista Mobile - Tarjetas */}
        <div className="md:hidden divide-y divide-gray-700">
          {ordenes.map((orden) => {
            const ordenConPago = getOrdenConPago(orden)
            return (
              <div
                key={orden.id}
                className="p-4 hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(orden)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-sm text-gray-400">#{orden.id.slice(0, 8)}...</div>
                  <div>{getEstadoBadge(orden.estado, ordenConPago.pago)}</div>
                </div>

                <div className="mb-2">
                  <div className="font-medium text-white">{getEventoNombre(orden)}</div>
                  <div className="text-sm text-gray-400">{formatFecha(orden.fecha_creacion)}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">{orden.nombre_cliente}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[180px]">{orden.email_cliente}</div>
                  </div>
                  <div className="text-white font-medium">{formatMonto(orden.total)}</div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRowClick(orden)
                    }}
                    className="px-3 py-1 bg-[#BF8D6B] hover:bg-[#A67A5B] text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Ver detalles
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {ordenes.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">No se encontraron órdenes</div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Anterior
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page ? "bg-[#BF8D6B] text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            )
          })}

          {totalPages > 5 && (
            <>
              <span className="text-gray-400">...</span>
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === totalPages ? "bg-[#BF8D6B] text-white" : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal de Detalle */}
      {showModal && selectedOrden && <OrdenDetalleModal orden={selectedOrden} onClose={() => setShowModal(false)} />}
    </div>
  )
}
