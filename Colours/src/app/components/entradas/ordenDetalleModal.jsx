"use client"

import { useEffect, useRef, useState } from "react"
import { X, User, Calendar, Tag, CreditCard, FileText, ImageIcon, Download } from "lucide-react"
import { jsPDF } from "jspdf"

export default function OrdenDetalleModal({ orden, onClose }) {
  const modalRef = useRef(null)
  const [isOpen, setIsOpen] = useState(!!orden) // Controla si el modal está abierto

  // Si no hay orden, no renderizar nada
  if (!isOpen) return null

  // Manejar cierre con Escape y click fuera del modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
        setIsOpen(false) // Cierra el modal al presionar Escape
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
        setIsOpen(false) // Cierra el modal al hacer clic fuera
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const formatFecha = (fecha) => {
    if (!fecha) return "Sin fecha"
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatMonto = (monto) => {
    return `$${Number.parseFloat(monto || 0).toLocaleString()}`
  }

  const getEventoNombre = () => {
    if (orden.DetalleDeOrdens && orden.DetalleDeOrdens.length > 0) {
      return orden.DetalleDeOrdens[0]?.Entrada?.Evento?.nombre || "Sin evento"
    }
    return "Sin evento"
  }

  // Función para descargar PDF
  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Configurar fuentes
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(18)
      pdf.text("Detalle de Orden", 105, 20, { align: "center" })

      // ID de la orden
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")
      pdf.text(`Orden #${orden.id}`, 105, 30, { align: "center" })

      let yPosition = 45

      // Datos del Cliente
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("DATOS DEL CLIENTE", 20, yPosition)
      yPosition += 10

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Nombre: ${orden.nombre_cliente}`, 20, yPosition)
      pdf.text(`DNI: ${orden.dni_cliente}`, 110, yPosition)
      yPosition += 6
      pdf.text(`Teléfono: ${orden.telefono_cliente}`, 20, yPosition)
      pdf.text(`Email: ${orden.email_cliente}`, 110, yPosition)
      yPosition += 15

      // Información del Evento
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("INFORMACIÓN DEL EVENTO", 20, yPosition)
      yPosition += 10

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(`Evento: ${getEventoNombre()}`, 20, yPosition)
      yPosition += 6
      pdf.text(`Fecha de creación: ${formatFecha(orden.fecha_creacion)}`, 20, yPosition)
      if (orden.fecha_pago) {
        yPosition += 6
        pdf.text(`Fecha de pago: ${formatFecha(orden.fecha_pago)}`, 20, yPosition)
      }
      yPosition += 15

      // Entradas
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("ENTRADAS", 20, yPosition)
      yPosition += 10

      // Tabla de entradas
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(9)
      pdf.text("Tipo", 20, yPosition)
      pdf.text("Cantidad", 80, yPosition)
      pdf.text("Precio Unit.", 120, yPosition)
      pdf.text("Subtotal", 160, yPosition)
      yPosition += 5

      // Línea separadora
      pdf.line(20, yPosition, 190, yPosition)
      yPosition += 5

      pdf.setFont("helvetica", "normal")
      orden.DetalleDeOrdens?.forEach((detalle) => {
        pdf.text(detalle.Entrada?.tipo_entrada || "N/A", 20, yPosition)
        pdf.text(detalle.cantidad.toString(), 80, yPosition)
        pdf.text(formatMonto(detalle.precio_unitario), 120, yPosition)
        pdf.text(formatMonto(detalle.total), 160, yPosition)
        yPosition += 6
      })

      yPosition += 10

      // Total
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.text(`TOTAL: ${formatMonto(orden.total)}`, 20, yPosition)
      yPosition += 15

      // Información del Pago
      if (orden.pago) {
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(14)
        pdf.text("INFORMACIÓN DEL PAGO", 20, yPosition)
        yPosition += 10

        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.text(`Estado: ${orden.pago.estatus}`, 20, yPosition)
        pdf.text(`Referencia: ${orden.pago.referencia}`, 110, yPosition)
        yPosition += 6
        pdf.text(`Monto: ${formatMonto(orden.pago.monto)}`, 20, yPosition)
        pdf.text(`Total: ${formatMonto(orden.pago.total)}`, 110, yPosition)
        yPosition += 6
        pdf.text(`Fecha de pago: ${formatFecha(orden.pago.fecha_pago)}`, 20, yPosition)

        if (orden.pago.descripcion) {
          yPosition += 6
          pdf.text(`Descripción: ${orden.pago.descripcion}`, 20, yPosition)
        }
      } else {
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(14)
        pdf.text("PAGO PENDIENTE", 20, yPosition)
        yPosition += 10
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.text("Esta orden aún no ha sido pagada", 20, yPosition)
      }

      // Pie de página
      pdf.setFont("helvetica", "italic")
      pdf.setFontSize(8)
      pdf.text(
        `Generado el ${new Date().toLocaleDateString("es-ES")} a las ${new Date().toLocaleTimeString("es-ES")}`,
        105,
        280,
        { align: "center" },
      )

      // Guardar el PDF
      const fileName = `Orden_${orden.id.slice(0, 8)}_${new Date().toISOString().slice(0, 10)}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generando PDF:", error)
      alert("Error al generar el PDF")
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg border-2 border-[#BF8D6B] overflow-hidden flex flex-col w-full max-w-4xl h-full max-h-[90vh]"
      >
        {/* Header Sticky */}
        <div className="sticky top-0 z-10 bg-gray-800 p-4 sm:p-6 pb-2 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Detalle de Orden</h2>
            <p className="text-sm text-gray-300">#{orden.id}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Botón Descargar PDF */}
            <button
              onClick={downloadPDF}
              className="px-3 py-2 bg-[#BF8D6B] hover:bg-[#A67A5B] text-white rounded-lg transition-colors flex items-center gap-1"
              title="Descargar PDF"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            {/* Botón Cerrar */}
            <button
              onClick={() => {
                onClose()
                setIsOpen(false)
              }}
              className="text-[#BF8D6B] hover:text-[#A67A5B] transition-colors p-1"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenido Scrolleable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Información de la Orden */}
            <div className="bg-white text-black p-6 rounded-lg">
              <div className="mb-4 border-b pb-3">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                  <h3 className="font-semibold">Datos del Cliente</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Nombre:</p>
                    <p className="font-medium">{orden.nombre_cliente}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">DNI:</p>
                    <p className="font-medium">{orden.dni_cliente}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teléfono:</p>
                    <p className="font-medium">{orden.telefono_cliente}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium truncate">{orden.email_cliente}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 border-b pb-3">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                  <h3 className="font-semibold">Información del Evento</h3>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-lg">{getEventoNombre()}</p>
                  <p className="text-gray-600 mt-1">
                    <strong>Fecha de creación:</strong> {formatFecha(orden.fecha_creacion)}
                  </p>
                  {orden.fecha_pago && (
                    <p className="text-gray-600">
                      <strong>Fecha de pago:</strong> {formatFecha(orden.fecha_pago)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 border-b pb-3">
                <div className="flex items-center mb-2">
                  <Tag className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                  <h3 className="font-semibold">Entradas</h3>
                </div>
                <div className="space-y-2">
                  {orden.DetalleDeOrdens?.map((detalle, index) => (
                    <div key={detalle.id} className="bg-gray-50 p-3 rounded border">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{detalle.Entrada?.tipo_entrada}</p>
                          <p className="text-sm text-gray-600">
                            Cantidad: {detalle.cantidad} × {formatMonto(detalle.precio_unitario)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatMonto(detalle.total)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                  <h3 className="font-semibold">Resumen</h3>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatMonto(orden.total)}</span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        orden.pago
                          ? "bg-green-100 text-green-800"
                          : orden.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {orden.pago ? "Pagado" : orden.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del Pago */}
            <div className="bg-white text-black p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-[#BF8D6B]" />
                <h3 className="font-semibold">Información del Pago</h3>
              </div>

              {orden.pago ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Estado:</p>
                        <p className="font-medium text-green-700">{orden.pago.estatus}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Referencia:</p>
                        <p className="font-medium">{orden.pago.referencia}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Monto:</p>
                        <p className="font-medium">{formatMonto(orden.pago.monto)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total:</p>
                        <p className="font-bold text-lg">{formatMonto(orden.pago.total)}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-gray-600">Fecha de pago:</p>
                        <p className="font-medium">{formatFecha(orden.pago.fecha_pago)}</p>
                      </div>
                      {orden.pago.descripcion && (
                        <div className="sm:col-span-2">
                          <p className="text-gray-600">Descripción:</p>
                          <p className="font-medium">{orden.pago.descripcion}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comprobante de Pago */}
                  {orden.pago.imagen && (
                    <div>
                      <div className="flex items-center mb-2">
                        <ImageIcon className="h-4 w-4 mr-2 text-[#BF8D6B]" />
                        <h4 className="font-medium">Comprobante de Pago</h4>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={orden.pago.imagen || "/placeholder.svg"}
                          alt="Comprobante de pago"
                          className="w-full h-64 object-contain bg-gray-50"
                          onError={(e) => {
                            e.target.style.display = "none"
                            e.target.nextSibling.style.display = "block"
                          }}
                        />
                        <div className="hidden p-4 text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                          <p>No se pudo cargar la imagen</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 text-yellow-500" />
                  <p className="text-yellow-700 font-medium">Pago Pendiente</p>
                  <p className="text-yellow-600 text-sm mt-1">Esta orden aún no ha sido pagada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
