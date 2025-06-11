"use client"

import { useRef, useState } from "react"
import { X, Download, FileText, Calendar, DollarSign, TrendingUp, Users } from "lucide-react"
import { jsPDF } from "jspdf"

export default function ReportePDFModal({ isOpen, onClose, ordenes, pagos, totales }) {
  const reportRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)

  if (!isOpen) return null

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

  // Obtener nombre del evento
  const getEventoNombre = (orden) => {
    if (orden.DetalleDeOrdens && orden.DetalleDeOrdens.length > 0) {
      return orden.DetalleDeOrdens[0]?.Entrada?.Evento?.nombre || "Sin evento"
    }
    return "Sin evento"
  }

  // Combinar órdenes con pagos
  const ordenesConPago = ordenes.map((orden) => {
    const pago = pagos.find((p) => p.ordenId === orden.id)
    return { ...orden, pago }
  })

  // Calcular estadísticas adicionales
  const estadisticas = {
    ordenesPagadas: ordenesConPago.filter((o) => o.pago).length,
    ordenesPendientes: ordenesConPago.filter((o) => !o.pago).length,
    promedioOrden: ordenes.length > 0 ? totales.totalEntradas / ordenes.length : 0,
    tasaConversion: ordenes.length > 0 ? (ordenesConPago.filter((o) => o.pago).length / ordenes.length) * 100 : 0,
  }

  // Generar PDF
  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Configurar fuentes
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(20)
      pdf.text("REPORTE DE ÓRDENES Y PAGOS", 105, 20, { align: "center" })

      // Fecha del reporte
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(
        `Generado el ${new Date().toLocaleDateString("es-ES")} a las ${new Date().toLocaleTimeString("es-ES")}`,
        105,
        30,
        { align: "center" },
      )

      let yPosition = 45

      // RESUMEN EJECUTIVO
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(16)
      pdf.text("RESUMEN EJECUTIVO", 20, yPosition)
      yPosition += 15

      // Cuadro de resumen principal
      pdf.setDrawColor(191, 141, 107) // Color #BF8D6B
      pdf.setLineWidth(0.5)
      pdf.rect(20, yPosition - 5, 170, 35)

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.text("TOTALES GENERALES", 25, yPosition + 5)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Total en Órdenes: ${formatMonto(totales.totalEntradas)}`, 25, yPosition + 15)
      pdf.text(`Total Pagado: ${formatMonto(totales.totalPagado)}`, 105, yPosition + 15)
      pdf.text(`Total Pendiente: ${formatMonto(totales.totalEntradas - totales.totalPagado)}`, 25, yPosition + 25)
      pdf.text(`Cantidad de Órdenes: ${ordenes.length}`, 105, yPosition + 25)

      yPosition += 45

      // ESTADÍSTICAS ADICIONALES
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("ESTADÍSTICAS", 20, yPosition)
      yPosition += 10

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(
        `• Órdenes Pagadas: ${estadisticas.ordenesPagadas} (${estadisticas.tasaConversion.toFixed(1)}%)`,
        25,
        yPosition,
      )
      yPosition += 6
      pdf.text(`• Órdenes Pendientes: ${estadisticas.ordenesPendientes}`, 25, yPosition)
      yPosition += 6
      pdf.text(`• Promedio por Orden: ${formatMonto(estadisticas.promedioOrden)}`, 25, yPosition)
      yPosition += 6
      pdf.text(`• Total de Pagos Registrados: ${pagos.length}`, 25, yPosition)
      yPosition += 15

      // DETALLE DE ÓRDENES
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("DETALLE DE ÓRDENES", 20, yPosition)
      yPosition += 10

      // Encabezados de tabla
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(8)
      pdf.text("ID", 20, yPosition)
      pdf.text("Cliente", 35, yPosition)
      pdf.text("Evento", 80, yPosition)
      pdf.text("Fecha", 120, yPosition)
      pdf.text("Monto", 145, yPosition)
      pdf.text("Estado", 165, yPosition)
      yPosition += 5

      // Línea separadora
      pdf.line(20, yPosition, 190, yPosition)
      yPosition += 5

      // Datos de órdenes
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(7)

      ordenesConPago.forEach((orden, index) => {
        if (yPosition > 270) {
          pdf.addPage()
          yPosition = 20

          // Repetir encabezados en nueva página
          pdf.setFont("helvetica", "bold")
          pdf.setFontSize(8)
          pdf.text("ID", 20, yPosition)
          pdf.text("Cliente", 35, yPosition)
          pdf.text("Evento", 80, yPosition)
          pdf.text("Fecha", 120, yPosition)
          pdf.text("Monto", 145, yPosition)
          pdf.text("Estado", 165, yPosition)
          yPosition += 5
          pdf.line(20, yPosition, 190, yPosition)
          yPosition += 5
          pdf.setFont("helvetica", "normal")
          pdf.setFontSize(7)
        }

        const evento = getEventoNombre(orden)
        const estado = orden.pago ? "Pagado" : orden.estado

        pdf.text(orden.id.slice(0, 8), 20, yPosition)
        pdf.text(orden.nombre_cliente.substring(0, 20), 35, yPosition)
        pdf.text(evento.substring(0, 15), 80, yPosition)
        pdf.text(formatFecha(orden.fecha_creacion), 120, yPosition)
        pdf.text(formatMonto(orden.total), 145, yPosition)
        pdf.text(estado, 165, yPosition)
        yPosition += 5
      })

      // Nueva página para resumen de pagos si hay pagos
      if (pagos.length > 0) {
        pdf.addPage()
        yPosition = 20

        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(16)
        pdf.text("DETALLE DE PAGOS", 20, yPosition)
        yPosition += 15

        // Encabezados de tabla de pagos
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(8)
        pdf.text("Orden ID", 20, yPosition)
        pdf.text("Referencia", 50, yPosition)
        pdf.text("Fecha Pago", 90, yPosition)
        pdf.text("Monto", 125, yPosition)
        pdf.text("Estado", 150, yPosition)
        pdf.text("Comprobante", 170, yPosition)
        yPosition += 5

        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 5

        // Datos de pagos
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(7)

        pagos.forEach((pago) => {
          if (yPosition > 270) {
            pdf.addPage()
            yPosition = 20
          }

          pdf.text(pago.ordenId?.slice(0, 8) || "N/A", 20, yPosition)
          pdf.text(pago.referencia?.substring(0, 15) || "N/A", 50, yPosition)
          pdf.text(formatFecha(pago.fecha_pago), 90, yPosition)
          pdf.text(formatMonto(pago.total), 125, yPosition)
          pdf.text(pago.estatus || "N/A", 150, yPosition)
          pdf.text(pago.imagen ? "Sí" : "No", 170, yPosition)
          yPosition += 5
        })
      }

      // Pie de página en todas las páginas
      const pageCount = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFont("helvetica", "italic")
        pdf.setFontSize(8)
        pdf.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" })
        pdf.text("Reporte generado automáticamente", 105, 295, { align: "center" })
      }

      // Guardar PDF
      const fileName = `Reporte_Ordenes_Pagos_${new Date().toISOString().slice(0, 10)}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generando PDF:", error)
      alert("Error al generar el PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg border-2 border-[#BF8D6B] overflow-hidden flex flex-col w-full max-w-5xl h-full max-h-[90vh]">
        {/* Header Sticky */}
        <div className="sticky top-0 z-10 bg-gray-800 p-4 sm:p-6 pb-2 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Vista Previa del Reporte</h2>
            <p className="text-sm text-gray-300">Reporte de Órdenes y Pagos</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className={`px-4 py-2 ${
                isGenerating ? "bg-gray-500" : "bg-[#BF8D6B] hover:bg-[#A67A5B]"
              } text-white rounded-lg transition-colors flex items-center gap-2`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Generando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors p-1"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenido Scrolleable - Vista Previa */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-4">
          <div ref={reportRef} className="bg-white text-black p-8 rounded-lg max-w-4xl mx-auto">
            {/* Encabezado del Reporte */}
            <div className="text-center mb-8 border-b pb-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">REPORTE DE ÓRDENES Y PAGOS</h1>
              <p className="text-sm text-gray-600">
                Generado el {new Date().toLocaleDateString("es-ES")} a las {new Date().toLocaleTimeString("es-ES")}
              </p>
            </div>

            {/* Resumen Ejecutivo */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                RESUMEN EJECUTIVO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Total Órdenes</p>
                  <p className="text-xl font-bold text-blue-600">{formatMonto(totales.totalEntradas)}</p>
                  <p className="text-xs text-gray-500">{ordenes.length} órdenes</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">Total Pagado</p>
                  <p className="text-xl font-bold text-green-600">{formatMonto(totales.totalPagado)}</p>
                  <p className="text-xs text-gray-500">{pagos.length} pagos</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm text-gray-600">Pendiente</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatMonto(totales.totalEntradas - totales.totalPagado)}
                  </p>
                  <p className="text-xs text-gray-500">Por cobrar</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Tasa Conversión</p>
                  <p className="text-xl font-bold text-purple-600">{estadisticas.tasaConversion.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">Órdenes pagadas</p>
                </div>
              </div>

              {/* Estadísticas Adicionales */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Estadísticas Detalladas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Órdenes Pagadas:</strong> {estadisticas.ordenesPagadas}
                    </p>
                    <p>
                      <strong>Órdenes Pendientes:</strong> {estadisticas.ordenesPendientes}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Promedio por Orden:</strong> {formatMonto(estadisticas.promedioOrden)}
                    </p>
                    <p>
                      <strong>Total Pagos Registrados:</strong> {pagos.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de Órdenes */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">DETALLE DE ÓRDENES</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-2 py-2 text-left">ID Orden</th>
                      <th className="border border-gray-300 px-2 py-2 text-left">Cliente</th>
                      <th className="border border-gray-300 px-2 py-2 text-left">Evento</th>
                      <th className="border border-gray-300 px-2 py-2 text-left">Fecha</th>
                      <th className="border border-gray-300 px-2 py-2 text-right">Monto</th>
                      <th className="border border-gray-300 px-2 py-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenesConPago.slice(0, 10).map((orden) => (
                      <tr key={orden.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-mono text-xs">
                          #{orden.id.slice(0, 8)}...
                        </td>
                        <td className="border border-gray-300 px-2 py-2">{orden.nombre_cliente}</td>
                        <td className="border border-gray-300 px-2 py-2">{getEventoNombre(orden)}</td>
                        <td className="border border-gray-300 px-2 py-2">{formatFecha(orden.fecha_creacion)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right font-medium">
                          {formatMonto(orden.total)}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              orden.pago
                                ? "bg-green-100 text-green-800"
                                : orden.estado === "pendiente"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {orden.pago ? "Pagado" : orden.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {ordenesConPago.length > 10 && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Mostrando las primeras 10 órdenes. El PDF incluirá todas las {ordenesConPago.length} órdenes.
                  </p>
                )}
              </div>
            </div>

            {/* Tabla de Pagos */}
            {pagos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">DETALLE DE PAGOS</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-2 py-2 text-left">Orden</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Referencia</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Fecha Pago</th>
                        <th className="border border-gray-300 px-2 py-2 text-right">Monto</th>
                        <th className="border border-gray-300 px-2 py-2 text-center">Estado</th>
                        <th className="border border-gray-300 px-2 py-2 text-center">Comprobante</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagos.slice(0, 10).map((pago) => (
                        <tr key={pago.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-2 py-2 font-mono text-xs">
                            #{pago.ordenId?.slice(0, 8)}...
                          </td>
                          <td className="border border-gray-300 px-2 py-2">{pago.referencia}</td>
                          <td className="border border-gray-300 px-2 py-2">{formatFecha(pago.fecha_pago)}</td>
                          <td className="border border-gray-300 px-2 py-2 text-right font-medium">
                            {formatMonto(pago.total)}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {pago.estatus}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{pago.imagen ? "✅" : "❌"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pagos.length > 10 && (
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Mostrando los primeros 10 pagos. El PDF incluirá todos los {pagos.length} pagos.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Pie del Reporte */}
            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>Reporte generado automáticamente</p>
              <p>
                Fecha: {new Date().toLocaleDateString("es-ES")} - Hora: {new Date().toLocaleTimeString("es-ES")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
